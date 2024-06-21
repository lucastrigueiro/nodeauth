import { AppDataSource } from "../config/database/dataSource";
import { UserService } from './UserService';
import { NotFoundException, UnauthorizedException } from '../exceptions/exceptions';

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(AppDataSource);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Compara a senha fornecida com a hash armazenada
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      return user;
    }
    throw new UnauthorizedException('Invalid password');
  }

}
