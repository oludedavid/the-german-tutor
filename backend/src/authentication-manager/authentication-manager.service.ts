import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import {
  Dashboard,
  DashbordDocument,
} from 'src/dashboard-manager/schemas/dashboard.schema';
import { Cart, CartDocument } from 'src/cart-manager/schemas/cart.schema';
import { JwtService } from '@nestjs/jwt';
import * as sanitizeHtml from 'sanitize-html';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthenticationManagerService {
  private emailTransporter: nodemailer.Transporter;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Dashboard.name)
    private readonly dashboardModel: Model<DashbordDocument>,
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    private jwtService: JwtService,
  ) {
    this.emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_TRANSPORTER_USER_MAIL,
        pass: process.env.EMAIL_TRANSPORTER_USER_PASSWORD,
      },
    });
  }

  async generateToken(user: UserDocument): Promise<string> {
    const payload = {
      sub: user._id,
      email: user.email,
      username: user.fullName,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async sendVerificationEmail(
    email: string,
    fullName: string,
    token: string,
  ): Promise<void> {
    const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_TRANSPORTER_USER_MAIL,
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Welcome to Our The German Tutor Platform!</h2>
          <p>Hi ${fullName},</p>
          <p>Please verify your email address by clicking the button below:</p>
          <p style="text-align: center;">
            <a href="${verificationUrl}" 
              style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
              Verify Email
            </a>
          </p>
          <p>If the button doesn't work, use the following link:</p>
          <p>${verificationUrl}</p>
          <p>If you didn't request this registration, please ignore this email or contact support.</p>
        </div>
      `,
    };

    await this.emailTransporter.sendMail(mailOptions);
  }

  async registerUser(user: {
    fullName: string;
    email: string;
    password: string;
  }): Promise<string> {
    const { fullName, email, password } = user;

    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedFullName || !trimmedEmail || !trimmedPassword) {
      throw new BadRequestException(
        'Missing required fields: fullName, email, or password',
      );
    }

    const sanitizedFullName = sanitizeHtml(trimmedFullName);
    const sanitizedEmail = sanitizeHtml(trimmedEmail);
    const sanitizedPassword = sanitizeHtml(trimmedPassword);

    const doesUserExist = await this.userModel
      .findOne({
        email: sanitizedEmail,
      })
      .collation({ locale: 'en', strength: 2 });
    if (doesUserExist) {
      throw new BadRequestException('User already exists');
    }
    const passwordStrengthRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\-]{8,}$/;

    if (!passwordStrengthRegex.test(sanitizedPassword)) {
      throw new BadRequestException(
        'Password must be at least 8 characters long and contain at least one letter and one number',
      );
    }
    const hashedPassword = await bcrypt.hash(sanitizedPassword, 10);

    const newUser = new this.userModel({
      fullName: sanitizedFullName,
      email: sanitizedEmail,
      password: hashedPassword,
      isVerified: false,
      role: 'user',
    });
    await newUser.save();

    const verificationToken = await this.generateToken(newUser);
    await this.sendVerificationEmail(
      sanitizedEmail,
      sanitizedFullName,
      verificationToken,
    );

    return `User ${sanitizedFullName} successfully registered. Please check your email to verify your account. In order to login successfully, you need to verify your email address.`;
  }

  async verifyEmail(token: string): Promise<string> {
    try {
      if (!token) {
        throw new BadRequestException(
          'Token is required to verify your email.',
        );
      }

      const decoded = this.jwtService.verify(token);
      if (!decoded || !decoded.email) {
        throw new BadRequestException('Invalid verification token.');
      }

      const existingUser = await this.userModel.findOne({
        email: decoded.email,
      });
      if (!existingUser) {
        throw new BadRequestException('User does not exist.');
      }

      if (existingUser.isVerified) {
        throw new BadRequestException(
          'You are already fully registered and verified. Please login.',
        );
      }

      existingUser.isVerified = true;
      await existingUser.save();

      const session = await this.cartModel.db.startSession();
      session.startTransaction();
      try {
        const newDashboard = new this.dashboardModel({
          owner: existingUser._id,
        });
        await newDashboard.save({ session });

        const newCart = new this.cartModel({
          owner: existingUser._id,
          courses: [],
        });
        await newCart.save({ session });

        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        throw new BadRequestException(
          'Failed to verify email and create resources',
        );
      } finally {
        session.endSession();
      }

      return 'Email verified successfully. You are now fully registered.';
    } catch (error) {
      console.error('Verification error:', error);
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException(
          'Verification token expired. Please register again.',
        );
      }
      throw new BadRequestException('Verification failed.');
    }
  }

  async loginUser(user: { email: string; password: string }): Promise<string> {
    const { email, password } = user;

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      throw new BadRequestException(
        'Missing required fields: email or password',
      );
    }

    const sanitizedEmail = sanitizeHtml(trimmedEmail);
    const sanitizedPassword = sanitizeHtml(trimmedPassword);

    const existingUser = await this.userModel.findOne({
      email: sanitizedEmail,
    });
    if (!existingUser) {
      throw new BadRequestException('User does not exist');
    }

    if (!existingUser.isVerified) {
      throw new BadRequestException(
        'Please verify your email address before logging in',
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      sanitizedPassword,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid password');
    }

    const token = await this.generateToken(existingUser);
    return JSON.stringify({
      token,
    });
  }

  async logoutUser(): Promise<string> {
    return 'User successfully logged out';
  }
}
