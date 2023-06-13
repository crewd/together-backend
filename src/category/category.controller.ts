import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { CreateCategorytDto } from './dto/create-category.dto';

@ApiTags('category')
@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @Get('store/:storeId/category')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '카테고리 목록 조회',
    description: '카테고리 목록 조회 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  getCategoryList(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
  ) {
    return this.categoryService.getCategoryList(userId, storeId);
  }

  @UseGuards(AuthGuard)
  @Post('store/:storeId/category')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '카테고리 생성',
    description: '카테고리 생성 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  createCategory(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Body() createCategoryDto: CreateCategorytDto,
  ) {
    return this.categoryService.createCategory(
      userId,
      storeId,
      createCategoryDto,
    );
  }
}
