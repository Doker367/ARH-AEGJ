import { Request, Response, Router } from 'express';
import { AuthenticateUserUseCase } from '../../../application/use-cases/authenticate-user.use-case';

function isUnachEmail(email: string): boolean {
  // Ejemplo: alberto.grajales97@unach.mx
  const unachEmailRegex = /^[a-z]+\.[a-z]+[0-9]{2}@unach\.mx$/;
  return unachEmailRegex.test(email);
}

function isMatricula(matricula: string): boolean {
  // Exactamente 9 dígitos
  return /^[0-9]{9}$/.test(matricula);
}

export function createUserController(authenticateUserUseCase: AuthenticateUserUseCase): Router {
  const router = Router();

  router.post('/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      if (!isUnachEmail(username)) {
        return res.status(400).json({ message: 'El correo debe ser un correo institucional unach válido (ejemplo: nombre.apellido97@unach.mx)' });
      }

      if (!isMatricula(password)) {
        return res.status(400).json({ message: 'La contraseña debe ser una matrícula válida de 9 dígitos' });
      }

      const user = await authenticateUserUseCase.execute(username, password);

      if (user) {
        return res.status(200).json({ message: 'Autenticación exitosa', user });
      } else {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

  return router;
}
