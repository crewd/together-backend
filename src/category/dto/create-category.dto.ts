import { IsString } from 'class-validator';

export class CreateCategorytDto {
  /**
   * 생성할 카테고리명
   * @example '주방'
   */
  @IsString()
  name: string;
}
