import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  /**
   * 가입돤 계정의 이메일
   * @example 'example@gmail.com'
   */
  @IsEmail()
  email: string;

  /**
   * 가입돤 계정의 비밀번호
   * @example 'user_password'
   */
  @IsString()
  password: string;

  /**
   * 로그인 유지 여부
   * @example true
   */

  @IsBoolean()
  keep: boolean;
}
