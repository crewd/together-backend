export class CreateWorkDto {
  /**
   * 생성할 업무의 제목
   * @example '출근 후'
   */
  title: string;

  /**
   * 생성할 업무 내용
   * @example '출근카드 체크'
   */
  content: string;
}
