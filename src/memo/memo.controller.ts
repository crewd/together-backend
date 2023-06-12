import { ApiTags } from '@nestjs/swagger';
import { MemoService } from './memo.service';
import { Controller } from '@nestjs/common';

@ApiTags('인수인계')
@Controller()
export class MemoController {
  constructor(private memoService: MemoService) {}
}
