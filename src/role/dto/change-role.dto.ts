import { IsString } from 'class-validator';
import { Roles } from '../role.enum';

export class ChangeRoleDto {
  /**
   * 변경할 권한명
   * @example "fullTime"
   */
  @IsString()
  roleName: Roles;
}
