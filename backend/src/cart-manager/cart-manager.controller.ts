import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateCartDto } from './dtos/create-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { CartManagerService } from './cart-manager.service';

@Controller('cart')
export class CartManagerController {
  constructor(private readonly cartManagerService: CartManagerService) {}

  /**
   * Create a new cart
   * @param createCartDto - Data Transfer Object for creating a cart
   * @returns Created cart
   */
  @Post()
  createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartManagerService.createCart(createCartDto);
  }

  /**
   * Retrieve all carts
   * @returns Array of carts
   */
  @Get()
  findAllCarts() {
    return this.cartManagerService.findAllCarts();
  }

  /**
   * Retrieve a cart by ID
   * @param id - Cart ID
   * @returns Cart with the specified ID
   */
  @Get(':id')
  findCartById(@Param('id') id: string) {
    return this.cartManagerService.findCartById(id);
  }

  /**
   * Update a cart and recalculate the total
   * @param id - Cart ID
   * @param updateCartDto - Data to update the cart
   * @returns Updated cart
   */
  @Patch(':id')
  updateCart(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartManagerService.updateCart(id, updateCartDto);
  }

  /**
   * Delete a cart by ID
   * @param id - Cart ID
   * @returns Confirmation of deletion
   */
  @Delete(':id')
  deleteCart(@Param('id') id: string) {
    return this.cartManagerService.deleteCart(id);
  }
}
