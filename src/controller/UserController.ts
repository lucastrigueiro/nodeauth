import { UserService } from '../service/UserService';
import { AppDataSource } from '../config/database/dataSource';


class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(AppDataSource);
  }

  async findAll(req, res, next) {
    try {
      const list = await this.userService.findAll();
      return res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
