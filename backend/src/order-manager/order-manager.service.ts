import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { Cart } from 'src/cart-manager/schemas/cart.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
  ) {}

  // Create a new order
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { cart, owner } = createOrderDto;

    const existingCart = await this.cartModel.findById(cart);
    if (!existingCart || existingCart.owner.toString() !== owner.toString()) {
      throw new Error('Cart not found or does not belong to the user.');
    }

    const newOrder = new this.orderModel(createOrderDto);
    return newOrder.save();
  }

  // Update an existing order
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

  // Fetch an order by its ID
  async getOrderById(orderId: string): Promise<Order | null> {
    return this.orderModel.findById(orderId).exec();
  }

  // Fetch all orders for a specific user
  async getOrdersByOwner(ownerId: string): Promise<Order[]> {
    return this.orderModel.find({ owner: ownerId }).exec();
  }
}
