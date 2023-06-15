import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
import { EditCategorytDto } from './dto/edit-category.dto';

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
  getCategoryList(@Param('storeId', ParseIntPipe) storeId: number) {
    return this.categoryService.getCategoryList(storeId);
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

  @UseGuards(AuthGuard)
  @Patch('store/:storeId/category/:categoryId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '카테고리 수정',
    description: '카테고리 수정 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  editNotice(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() editCategoryDto: EditCategorytDto,
  ) {
    return this.categoryService.editCategory(
      userId,
      storeId,
      categoryId,
      editCategoryDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('store/:storeId/category/:categoryId')
  @ApiOperation({
    summary: '카테고리 제거',
    description: '카테고리 제거 API',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundExecption' })
  deleteStore(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.categoryService.deleteCategory(userId, storeId, categoryId);
  }
}
