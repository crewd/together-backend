import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { plainToInstance } from 'class-transformer';
import { CategoryDto } from './dto/category.dto';
import { CreateCategorytDto } from './dto/create-category.dto';
import { Role } from 'src/role/role.entity';
import { Permission } from 'src/role/role.enum';
import { EditCategorytDto } from './dto/edit-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Store)
    private storeRepository: Repository<Store>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async getCategoryList(
    userId: number,
    storeId: number,
  ): Promise<CategoryDto[]> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException();
    }

    const store = await this.storeRepository.findOne({
      id: storeId,
      userId: userId,
    });

    if (!store) {
      throw new NotFoundException();
    }

    const categories = await this.categoryRepository.find({ storeId: storeId });

    const categoryList = plainToInstance(CategoryDto, categories);

    return categoryList;
  }

  async createCategory(
    userId: number,
    storeId: number,
    createCategoryDto: CreateCategorytDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException();
    }

    const store = await this.storeRepository.findOne({
      id: storeId,
      userId: userId,
    });

    if (!store) {
      throw new NotFoundException();
    }

    const role = await this.roleRepository.findOne({ userId, storeId });

    if (role.permission !== Permission.ADMIN) {
      throw new UnauthorizedException();
    }

    const category = new Category();
    category.store = store;
    category.storeId = storeId;
    category.name = createCategoryDto.name;

    await this.categoryRepository.save(category);
  }

  async editCategory(
    userId: number,
    storeId: number,
    categoryId: number,
    editCategoryDto: EditCategorytDto,
  ) {
    const role = await this.roleRepository.findOne({
      userId: userId,
      storeId: storeId,
    });

    if (role.permission !== Permission.ADMIN) {
      throw new UnauthorizedException();
    }

    const category = await this.categoryRepository.findOne({ id: categoryId });

    if (!category) {
      throw new NotFoundException();
    }

    if (category.storeId !== storeId) {
      throw new UnauthorizedException();
    }

    category.name = editCategoryDto.name;

    await this.categoryRepository.save(category);
  }
}
