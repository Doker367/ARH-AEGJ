import { User } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/services/user.repository';

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async findByUsername(username: string): Promise<User | null> {
    const user = this.users.find((u) => u.username === username);
    return user || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
