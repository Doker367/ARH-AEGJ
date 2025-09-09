import { UserRepository } from '../../domain/services/user.repository';

export class AuthenticateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(username: string, password: string): Promise<{ username: string } | null> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      return null;
    }

    if (user.password !== password) {
      return null;
    }

    // Exclude password from the returned object
    return { username: user.username };
  }
}
