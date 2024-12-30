import {
  Controller,
  UseGuards,
  Post,
  Get,
  Body,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateCartDto } from './dtos/create-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { CartManagerService } from './cart-manager.service';
import { JwtAuthGuard } from 'src/authentication-manager/guard/jwt-guard';

@Controller('cart')
export class CartManagerController {
  constructor(private readonly cartManagerService: CartManagerService) {}

  /**
   * Create a new cart
   * @param createCartDto - Data Transfer Object for creating a cart
   * @returns Created cart
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartManagerService.createCart(createCartDto);
  }

  /**
   * Retrieve all carts
   * @returns Array of carts
   */
  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAllCarts() {
    return this.cartManagerService.findAllCarts();
  }

  /**
   * Retrieve a cart by ID
   * @param ownerId - Cart ID
   * @returns Cart with the specified ID
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  findCartByOwnerId(@Query('ownerId') ownerId: string) {
    return this.cartManagerService.findCartByOwnerId(ownerId);
  }

  /**
   * Update a cart and recalculate the total
   * @param ownerId - Owner ID
   * @param updateCartDto - Data to update the cart
   * @returns Updated cart
   */
  @UseGuards(JwtAuthGuard)
  @Patch('ownerId')
  updateCart(
    @Query('ownerId') ownerId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartManagerService.updateOwnerCart(ownerId, updateCartDto);
  }

  /**
   * Delete a cart by owner ID
   * @param id - Owner ID
   * @returns Confirmation of deletion
   */
  @UseGuards(JwtAuthGuard)
  @Delete('ownerId')
  deleteCart(@Query('ownerId') ownerId: string) {
    return this.cartManagerService.deleteCart(ownerId);
  }
}
