import { HttpException } from "../../exceptions/exceptions";

export function errorMiddleware(err, req, res, next) {
  if (err instanceof HttpException) {
      return res.status(err.status).json({
          status: err.status,
          message: err.message,
      });
  }

  return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
  });
}

