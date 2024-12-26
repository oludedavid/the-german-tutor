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
   * @returns Array of all carts
   */
  async findAllCarts(): Promise<Cart[]> {
    return this.cartModel
      .find()
      .populate('owner')
      .populate('courses.courseOfferedId')
      .exec();
  }

  /**
   * Find a single cart by owner ID
   * @param ownerId - ID of the cart's owner
   * @returns The cart object
   */
  async findCartByOwnerId(ownerId: string): Promise<Cart> {
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

    return cart;
  }

  /**
   * Update a cart's courses or quantities
   * @param ownerId - ID of the cart's owner to update
   * @param updateData - Partial data to update the cart
   * @returns Updated cart object
   */
  async updateOwnerCart(
    ownerId: string,
    updateData: UpdateCartDto,
  ): Promise<Cart> {
    const cart = await this.cartModel
      .findOneAndUpdate({ owner: new Types.ObjectId(ownerId) }, updateData, {
        new: true,
      })
      .populate('owner')
      .populate('courses.courseOfferedId')
      .exec();

    if (!cart) {
      throw new NotFoundException(
        `Cart for owner with ID ${ownerId} not found`,
      );
    }

    return cart;
  }

  /**
   * Delete a cart by owner ID
   * @param ownerId - ID of the cart to delete
   * @returns Confirmation message
   */
  async deleteCart(ownerId: string): Promise<{ message: string }> {
    const result = await this.cartModel
      .findOneAndDelete({ owner: new Types.ObjectId(ownerId) })
      .exec();

    if (!result) {
      throw new NotFoundException(
        `Cart for owner with ID ${ownerId} not found`,
      );
    }

    return { message: `Cart with ID ${ownerId} deleted successfully` };
  }
}
