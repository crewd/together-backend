import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
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

@ApiTags('notice')
@Controller()
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @UseGuards(AuthGuard)
  @Get('store/:storeId/notice')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '매장 목록 조회',
    description: '매장 목록 조회 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  getNoticeList(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
  ) {
    return this.noticeService.getNoticeList(userId, storeId);
  }
}
