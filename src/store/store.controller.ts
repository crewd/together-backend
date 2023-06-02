import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
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

@ApiTags('store API')
@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @UseGuards(AuthGuard)
  @Get('list/:role')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '매장 목록 조회',
    description: '매장 목록 조회 API',
  })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  storeList(
    @User('userId', ParseIntPipe) userId: number,
    @Param('role') role: string,
  ) {
    return this.storeService.storeList(userId, role);
  }

  @UseGuards(AuthGuard)
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
