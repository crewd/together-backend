import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './store/store.module';
import { RoleModule } from './role/role.module';
import { NoticeModule } from './notice/notice.module';
import { MemoModule } from './memo/memo.module';
import { CategoryModule } from './category/category.module';
import { WorkModule } from './work/work.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    StoreModule,
    RoleModule,
    NoticeModule,
    MemoModule,
    CategoryModule,
    WorkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
