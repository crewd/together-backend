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
import { WokrService } from './work.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';

@ApiTags('업무사항')
@Controller()
@UseGuards(AuthGuard)
export class WorkController {
  constructor(private workService: WokrService) {}

  @Get('store/:storeId/category/:categoryId/work')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '업무 조회',
    description: '업무 조회 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  getWorkList(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.workService.getWorkList(userId, storeId, categoryId);
  }
}
