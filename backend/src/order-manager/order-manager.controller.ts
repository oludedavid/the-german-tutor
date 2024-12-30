import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order-manager.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { Order } from './schemas/order.schema';
import { JwtAuthGuard } from 'src/authentication-manager/guard/jwt-guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':orderId')
  async updateOrder(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(orderId, updateOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string): Promise<Order> {
    return this.orderService.getOrderById(orderId);
  }

  @Get('user/:ownerId')
  async getOrdersByOwner(@Param('ownerId') ownerId: string): Promise<Order[]> {
    return this.orderService.getOrdersByOwner(ownerId);
  }
}
