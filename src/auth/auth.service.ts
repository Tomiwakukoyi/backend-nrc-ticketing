import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    console.log('User found:', user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    try {
      if (!user) {
        // Handle invalid login attempt
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);
      return { access_token: token };
    } catch (error) {
      console.error('Error in login:', error);
      throw new InternalServerErrorException('Error during login');
    }
  }

  async register(email: string, password: string, name: string) {
    try {
      console.log('Attempting to register user:', { email, name });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });
      console.log('User registered successfully:', user.id);
      return this.login(user); // Automatically log in the user after registration
    } catch (error) {
      console.error('Error during user registration:', error);
      if (error.code === 'P2002') {
        throw new UnauthorizedException('Email already exists');
      }
      throw new InternalServerErrorException('Failed to register user');
    }
  }
}
