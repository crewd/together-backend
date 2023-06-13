import { IsString } from 'class-validator';

export class EditCategorytDto {
  /**
   * 변경할 카테고리명
   * @example '홀'
   */
  @IsString()
  name: string;
}
