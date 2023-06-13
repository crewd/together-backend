import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@ApiTags('category')
@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
}
