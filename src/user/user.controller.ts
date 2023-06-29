import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from 'src/Types/User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('search')
  searchUser(@Query('name') name: string) {
    return this.userService.searchUser(name);
  }

  @Post()
  createUser(@Body() userDetails: UserDetails) {
    return this.userService.createUser(userDetails);
  }

  @Put(':name')
  updateUser(@Param('name') name: string, @Body() userDetails: UserDetails) {
    return this.userService.updateUser(name, userDetails);
  }

  @Delete(':name')
  deleteUser(@Param('name') name: string) {
    return this.userService.deleteUser(name);
  }
}
