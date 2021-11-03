import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findCond({
      email, 
      password
    });
    if (user && user.password === password) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  generateToken(data: {email: string; id:number}){
    const payload = { username: data.email, sub: data.id };
    return this.jwtService.sign(payload);
  }

  async login(user: UserEntity) {
    const {password, ...userData} = user
    const payload = { username: user.email, sub: user.id };
    return {
      ...userData,
      access_token: this.generateToken(userData),
    };
  }

  async register(dto: CreateUserDto){
    const {password, ...userData} = await this.userService.create(dto);
    return {
      ...userData,
      access_token: this.generateToken(userData),
    };
  }
}
