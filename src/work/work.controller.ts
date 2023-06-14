import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WokrService } from './work.service';

@ApiTags('업무사항')
@Controller()
export class WorkController {
  constructor(private workService: WokrService) {}
}
