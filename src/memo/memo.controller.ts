import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MemoService } from './memo.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/user/user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateMemoDto } from './dto/create-memo.dto';

@ApiTags('인수인계')
@Controller()
export class MemoController {
  constructor(private memoService: MemoService) {}

  @UseGuards(AuthGuard)
  @Get('store/:storeId/memo')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '인수인계 목록 조회',
    description: '인수인계 목록 조회 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  getMemoList(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
  ) {
    return this.memoService.getMemoList(userId, storeId);
  }

  @UseGuards(AuthGuard)
  @Post('store/:storeId/memo/create')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '인수인계 생성',
    description: '인수인계 생성 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  createMemo(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Body() createMemoDto: CreateMemoDto,
  ) {
    return this.memoService.createMemo(userId, storeId, createMemoDto);
  }
}
