import { env } from '@/services/Environment';
import expressJWT from 'express-jwt';

/**
 * This middleware wraps up express-jwt. This is to
 * make the routes files look cleaner and not duplicating
 * the same code in multiple places.
 */
if (!env.appContext.jwtSecret) {
  throw new Error('You cannot run this application without a JWT Secret');
}
export const jwt = expressJWT({
  secret: env.appContext.jwtSecret,
  getToken: (request) => {
    return request.headers.token;
  },
  algorithms: ['HS256'],
});
