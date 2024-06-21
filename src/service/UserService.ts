import { Repository } from "typeorm";
import { User } from '../entity/User';
import { ListAllUsersDto } from "../dto/user.dto";

export class UserService {
  private userRepository: Repository<User>;

  constructor(dataSource) {
    this.userRepository = dataSource.getRepository(User);
  }

  async findAll(): Promise<ListAllUsersDto[]> {
    return (await this.userRepository.find())
      .map(user => ({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));
  }

  async findByEmail(username: string): Promise<User | undefined> {

    return await this.userRepository.findOne({
      where: { email: username },
      relations: ["roles"]
    });
  }
}
