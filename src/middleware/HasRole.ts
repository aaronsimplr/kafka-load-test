import express from 'express';
import { StatusCodes } from 'http-status-codes';
interface User {
  roles: string[];
}

interface RequestWithUser extends express.Request {
  user: User;
}
type HasRoleFunction = (
  request: RequestWithUser,
  response: express.Response,
  next: express.NextFunction,
) => void;

/**
 * This middleware will determin if the request.user has a certain role.
 * It will allow the request to proceed or return a 403 if the user doesnt
 * have the role.
 */
export const hasRole = (role: string): HasRoleFunction => {
  return async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    try {
      const roles = request.user?.roles;
      if (Array.isArray(roles) && roles.includes(role)) {
        next();
      } else {
        response
          .status(StatusCodes.FORBIDDEN)
          .json({ code: 10, message: 'Unauthorized' });
      }
    } catch (error) {
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ code: 11, message: error.message });
    }
  };
};
