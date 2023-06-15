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
import { NoticeService } from './notice.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { CreateNoticetDto } from './dto/create-notice.dto';
import { EditNoticetDto } from './dto/edit-notice.dto';

@ApiTags('notice')
@Controller()
@UseGuards(AuthGuard)
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

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

  @Post('store/:storeId/notice')
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

  @Patch('store/:storeId/notice/:noticeId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '공지사항 수정',
    description: '공지사항 수정 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  editNotice(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('noticeId', ParseIntPipe) noticeId: number,
    @Body() editNoticeDto: EditNoticetDto,
  ) {
    return this.noticeService.editNotice(
      userId,
      storeId,
      noticeId,
      editNoticeDto,
    );
  }

  @Delete('store/:storeId/notice/:noticeId')
  @ApiOperation({
    summary: '공지사항 제거',
    description: '공지사항 제거 API',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundExecption' })
  deleteStore(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('noticeId', ParseIntPipe) noticeId: number,
  ) {
    return this.noticeService.deleteNotice(userId, storeId, noticeId);
  }
}
