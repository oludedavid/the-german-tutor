import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { Cart } from 'src/cart-manager/schemas/cart.schema';
import { Types } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { cartId, ownerId } = createOrderDto;

    // Ensure the cart exists and belongs to the user
    const existingCart = await this.cartModel.findById({
      _id: new Types.ObjectId(cartId),
    });

    if (!existingCart || existingCart.owner.toString() !== ownerId.toString()) {
      throw new Error('Cart not found or does not belong to the user.');
    }

    const newOrder = new this.orderModel({
      ...createOrderDto,
      orderStatus: 'pending',
      paymentStatus: 'pending',
    });

    const savedOrder = await newOrder.save();

    const populatedOrder = await this.orderModel
      .findById(savedOrder._id)
      .populate('ownerId')
      .populate('cartId')
      .exec();

    return populatedOrder;
  }

  async updateOrder(
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new Error('Order not found.');
    }

    Object.assign(order, updateOrderDto);
    return order.save();
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    return this.orderModel.findById(orderId).exec();
  }

  async getOrdersByOwner(ownerId: string): Promise<Order[]> {
    return this.orderModel.find({ owner: ownerId }).exec();
  }
}
