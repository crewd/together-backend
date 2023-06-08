import { IsString } from 'class-validator';

export class EditNoticetDto {
  /**
   * 수정할 공지사항의 제목
   * @example '오늘의 공지'
   */
  @IsString()
  title: string;

  /**
   * 수정할 공지사항의 내용
   * @example '청소 열심히 합시다'
   */
  @IsString()
  content: string;
}
