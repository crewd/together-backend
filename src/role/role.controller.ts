import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleService } from './role.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { ChangeRoleDto } from './dto/change-role.dto';

@ApiTags('Role API')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @UseGuards(AuthGuard)
  @Patch('role/:storeId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '매장 목록 조회',
    description: '매장 목록 조회 API',
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  changeRole(
    @User('userId', ParseIntPipe) userId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Body() changeRoleDto: ChangeRoleDto,
  ) {
    return this.roleService.changeRole(userId, storeId, changeRoleDto);
  }
}
