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
import { StoreService } from './store.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/user/user.decorator';
import { CreateStoreDto } from './dto/create-store.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { EditStoreDto } from './dto/edit-store.dto';

@ApiTags('Store API')
@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @UseGuards(AuthGuard)
  @Get('list/:permission')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '매장 목록 조회',
    description: '매장 목록 조회 API',
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  storeList(
    @User('userId', ParseIntPipe) userId: number,
    @Param('permission') permission: string,
  ) {
    return this.storeService.storeList(userId, permission);
  }

  @UseGuards(AuthGuard)
  @Get('store/:storeId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '매장 상세 조회',
    description: '매장 상세 조회 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  detailStore(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
  ) {
    return this.storeService.detailStore(userId, storeId);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @ApiOperation({
    summary: '매장 생성',
    description: '매장 생성 API',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundExecption' })
  createStore(
    @User('userId', ParseIntPipe) userId: number,
    @Body() createStoreDto: CreateStoreDto,
  ) {
    return this.storeService.createStore(createStoreDto, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':storeId/edit')
  @ApiOperation({
    summary: '매장 정보 수정',
    description: '매장 정보 수정 API',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundExecption' })
  editStore(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Body() editStoreDto: EditStoreDto,
  ) {
    return this.storeService.editStore(storeId, userId, editStoreDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':storeId/delete')
  @ApiOperation({
    summary: '매장 제거',
    description: '매장 제거 API',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundExecption' })
  deleteStore(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
  ) {
    return this.storeService.deleteStore(userId, storeId);
  }
}
