import jwt from 'jsonwebtoken';
import { jwtValues } from '../constants/constants';

const { secretKey } = jwtValues;

export const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // Token inválido ou expirado
      }

      req.user = decoded; // Anexa o payload do token decodificado ao req.user
      next();
    });
  } else {
    res.sendStatus(401); // Não autorizado
  }
};

// Verifica se o usuário possui uma das roles necessárias
export const checkRole = roles => (req, res, next) => {
  const { user } = req;
  const hasRole = roles.some(role => user.roles.includes(role));

  if (!hasRole) {
    return res.status(403).send('Acesso negado: permissão insuficiente');
  }

  next();
};

