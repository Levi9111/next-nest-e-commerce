import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { RegisterDto } from './dtos/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const existing = await this.userModel.findOne({ email: data.email });

    if (existing) {
      throw new ConflictException('Email already in use');
    }

    // TODO: apply env variable here '10'
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userModel.create({
      ...data,
      password: hashedPassword,
    });

    return {
      status: HttpStatus.ACCEPTED,
      message: 'User registered successfully',
      user,
    };
  }

  async login(data: LoginDto) {
    const user = await this.userModel.findOne({ email: data.email });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = {
      sub: (user?._id as Types.ObjectId).toString(),
      email: user.email,
      role: user.role,
    };

    return {
      status: HttpStatus.ACCEPTED,
      message: 'User logged in successfully',
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
