export class EditWorkDto {
  /**
   * 생성할 업무의 제목
   * @example '퇴근 30분전'
   */
  title: string;

  /**
   * 생성할 업무 내용
   * @example '바닦청소'
   */
  content: string;
}
