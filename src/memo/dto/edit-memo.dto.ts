import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class EditMemoDto {
  /**
   * 수정할 인수인계의 내용
   * @example '오후 8시 저녁 예약 있습니다'
   */
  @IsOptional()
  @IsString()
  content: string;

  /**
   * 수정할 인수인계의 날짜
   * @example '2023-06-12'
   */
  @IsOptional()
  @IsBoolean()
  checked: boolean;

  @IsOptional()
  @IsString()
  completer: string;
}
