import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/user/user.decorator';
import { CreateStoreDto } from './dto/create-store.dto';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post('create')
  @ApiOperation({
    summary: '매장 생성',
    description: '매장 생성 API',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 404, description: 'NotFoundExecption' })
  createStore(
    @User('userId', ParseIntPipe) userId: number,
    @Body() createStoreDto: CreateStoreDto,
  ) {
    return this.storeService.createStore(createStoreDto, userId);
  }
}
