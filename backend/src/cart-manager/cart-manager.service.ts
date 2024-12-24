import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { CreateCartDto } from './dtos/create-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { Types } from 'mongoose';

@Injectable()
export class CartManagerService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
  ) {}

  /**
   * Create a new cart
   * @param createCartDto - Data Transfer Object for creating a cart
   * @returns Created cart document
   */
  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    const createdCart = new this.cartModel(createCartDto);
    return createdCart.save();
  }

  /**
   * Find all carts
   * @returns Array of all carts with calculated totals
   */
  async findAllCarts(): Promise<(Cart & { totalBill: number })[]> {
    const carts = await this.cartModel
      .find()
      .populate('owner')
      .populate('courses.courseOfferedId')
      .exec();
    return carts.map((cart) => this.calculateCartTotal(cart));
  }

  /**
   * Find a single cart by ID and calculate its total
   * @param ownerId - ID of the cart
   * @returns The cart with calculated total
   */
  async findCartByOwnerId(
    ownerId: string,
  ): Promise<Cart & { totalBill: number }> {
    const cart = await this.cartModel
      .findOne({ owner: new Types.ObjectId(ownerId) })
      .populate('owner')
      .populate('courses.courseOfferedId')
      .exec();

    if (!cart) {
      throw new NotFoundException(
        `Cart for owner with ID ${ownerId} not found`,
      );
    }

    return this.calculateCartTotal(cart);
  }

  /**
   * Update a cart's courses or quantities and recalculate the total
   * @param ownerId - ID of the cart to update
   * @param updateData - Partial data to update the cart
   * @returns Updated cart with calculated total
   */
  async updateOwnerCart(
    ownerId: string,
    updateData: UpdateCartDto,
  ): Promise<Cart & { totalBill: number }> {
    const cart = await this.cartModel
      .findByIdAndUpdate(new Types.ObjectId(ownerId), updateData, { new: true })
      .populate('owner')
      .populate('courses.courseOfferedId')
      .exec();

    if (!cart) {
      throw new NotFoundException(`Cart with ownerId ${ownerId} not found`);
    }

    return this.calculateCartTotal(cart);
  }

  /**
   * Delete a cart by ID
   * @param ownerId - ID of the cart to delete
   * @returns Confirmation message
   */
  async deleteCart(ownerId: string): Promise<{ message: string }> {
    const result = await this.cartModel
      .findByIdAndDelete({ owner: new Types.ObjectId(ownerId) })
      .exec();

    if (!result) {
      throw new NotFoundException(`Cart with ownerId ${ownerId} not found`);
    }

    return { message: `Cart with ID ${ownerId} deleted successfully` };
  }

  /**
   * Calculate the total bill and return an updated cart object.
   * @param cart - The cart document
   * @returns The cart object with an added `totalBill` field
   */
  private calculateCartTotal(cart: CartDocument): Cart & { totalBill: number } {
    const totalBill = cart.courses.reduce(
      (sum, course) => sum + course.quantity * course.price,
      0,
    );

    return { ...cart.toObject(), totalBill };
  }
}
