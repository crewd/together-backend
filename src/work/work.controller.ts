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
import { WokrService } from './work.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { CreateWorkDto } from './dto/create-work.dto';
import { EditWorkDto } from './dto/edit-work.dto';

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

  @Post('store/:storeId/category/:categoryId/work')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '업무 생성',
    description: '업무 생성 API',
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  createWork(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() createWorkDto: CreateWorkDto,
  ) {
    return this.workService.createWork(
      userId,
      storeId,
      categoryId,
      createWorkDto,
    );
  }

  @Patch('store/:storeId/work/:workId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '업무 수정',
    description: '업무 수정 API',
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  editNotice(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('workId', ParseIntPipe) workId: number,
    @Body() editWorkDto: EditWorkDto,
  ) {
    return this.workService.editWork(userId, storeId, workId, editWorkDto);
  }

  @Delete('store/:storeId/work/:workId')
  @ApiOperation({
    summary: '업무 제거',
    description: '업무 제거 API',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundExecption' })
  deleteStore(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('workId', ParseIntPipe) workId: number,
  ) {
    return this.workService.deleteWork(userId, storeId, workId);
  }
}
