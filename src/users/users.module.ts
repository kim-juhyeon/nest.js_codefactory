import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersModel]),
  ],
  exports:[UsersService], //export는 내보내기이고, 해당 UsersModule에서 userService를 내보내기 해줍니다.
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
