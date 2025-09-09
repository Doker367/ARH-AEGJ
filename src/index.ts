import { InMemoryUserRepository } from './adapters/out/in-memory/in-memory-user.repository';
import { AuthenticateUserUseCase } from './application/use-cases/authenticate-user.use-case';
import { createUserController } from './adapters/in/http/user.controller';
import { createServer } from './infrastructure/web/express';


const userRepository = new InMemoryUserRepository();


userRepository.save({ username: 'admin', password: 'password' });


const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);


const userController = createUserController(authenticateUserUseCase);


const app = createServer(userController);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en:  http://localhost:${PORT}`);
  console.log('Intenta logearte:');
  console.log(` '{"usuario": "admin", "contraseña": "password"}'`);
});
