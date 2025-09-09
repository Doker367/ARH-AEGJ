import { Request, Response, Router } from 'express';
import { AuthenticateUserUseCase } from '../../../application/use-cases/authenticate-user.use-case';

export function createUserController(authenticateUserUseCase: AuthenticateUserUseCase): Router {
  const router = Router();

  router.post('/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      const user = await authenticateUserUseCase.execute(username, password);

      if (user) {
        return res.status(200).json({ message: 'Authentication successful', user });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  return router;
}
