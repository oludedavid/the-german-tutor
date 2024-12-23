import { Controller, Post, Body, Param, Put, Get } from '@nestjs/common';
import { OrderService } from './order-manager.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { Order } from './schemas/order.schema';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Endpoint to create a new order
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  // Endpoint to update an order
  @Put(':orderId')
  async updateOrder(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(orderId, updateOrderDto);
  }

  // Endpoint to get an order by ID
  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string): Promise<Order> {
    return this.orderService.getOrderById(orderId);
  }

  // Endpoint to get all orders for a specific user
  @Get('user/:ownerId')
  async getOrdersByOwner(@Param('ownerId') ownerId: string): Promise<Order[]> {
    return this.orderService.getOrdersByOwner(ownerId);
  }
}
