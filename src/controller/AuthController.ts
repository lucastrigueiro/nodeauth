import { AuthService } from '../service/AuthService';
import jwt from 'jsonwebtoken';
import { LoginResponse } from '../dto/auth.dto';
import { jwtValues } from '../config/constants/constants';

const { secretKey, expiresIn } = jwtValues;


class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
  
      const userData = await this.authService.validateUser(username, password);
      const roles = userData.roles.map(role => role.name);
  
      if (userData != null) {
          const token = jwt.sign({ username: userData.email, roles }, secretKey, { expiresIn });
          const loginResponse: LoginResponse = { token, email: userData.email, roles };
          res.send(loginResponse);
      } else {
          res.status(401).send('Credenciais inválidas');
      }
    } catch (err) {
      next(err);
    }
  }

}

export default AuthController;
