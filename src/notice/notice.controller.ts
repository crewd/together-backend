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
import { NoticeService } from './notice.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { CreateNoticetDto } from './dto/create-notice.dto';

@ApiTags('notice')
@Controller()
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @UseGuards(AuthGuard)
  @Get('store/:storeId/notice')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '공지사항 목록 조회',
    description: '공지사항 목록 조회 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  getNoticeList(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
  ) {
    return this.noticeService.getNoticeList(userId, storeId);
  }

  @UseGuards(AuthGuard)
  @Post('store/:storeId/notice/create')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '공지사항 생성',
    description: '공지사항 생성 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  createNotice(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Body() createNoticeDto: CreateNoticetDto,
  ) {
    return this.noticeService.createNotice(userId, storeId, createNoticeDto);
  }
}
