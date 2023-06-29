import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDetails } from 'src/Types/User';

@Injectable()
export class UserService {
  private users = [
    { name: 'regis', email: 'regis@gmail.com', password: 'regis' },
    { name: 'irumva', email: 'irumva@gmail.com', password: 'irumva' },
    { name: 'dmc', email: 'dmc@gmail.com', password: 'dmc' },
  ];

  getUsers() {
    return this.users;
  }

  searchUser(name: string) {
    const users = this.users.filter((user) => user.name === name);
    if (users.length === 0) {
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    }
    return users;
  }

  createUser(userDetails: UserDetails) {
    if (!userDetails.email || !userDetails.password || !userDetails.name) {
      throw new HttpException(
        'All credential are required!',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.users.push(userDetails);
    return this.users;
  }

  updateUser(name: string, userDetails: UserDetails) {
    const user = this.searchUser(name);
    const updatedUser = { ...user };
    if (!userDetails.name) {
      updatedUser[0].name = user[0].name;
    } else {
      user[0].name = userDetails.name;
    }

    if (!userDetails.email) {
      updatedUser[0].email = user[0].email;
    } else {
      user[0].email = userDetails.email;
    }

    if (!userDetails.password) {
      updatedUser[0].password = user[0].password;
    } else {
      user[0].password = userDetails.password;
    }

    return user[0];
  }

  deleteUser(name) {
    this.searchUser(name);
    const users = this.getUsers().filter((user) => user.name !== name);

    return users;
  }
}
