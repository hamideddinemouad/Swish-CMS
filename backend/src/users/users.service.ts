import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

type SafeUser = Omit<User, 'passwordHash'>;

type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tenantId: string | null;
  tenantSubdomain: string | null;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<SafeUser> {
    const email = this.normalizeEmail(createUserDto.email);
    const emailAlreadyUsed = await this.usersRepository.exists({
      where: { email },
    });

    if (emailAlreadyUsed) {
      throw new ConflictException('Email is already in use');
    }

    const user = this.usersRepository.create({
      firstName: createUserDto.firstName.trim(),
      lastName: createUserDto.lastName.trim(),
      email,
      passwordHash: await bcrypt.hash(createUserDto.password, 10),
      secretPhraseHash: await bcrypt.hash(
        this.normalizeSecretPhrase(createUserDto.secretPhrase),
        10,
      ),
    });
    const savedUser = await this.usersRepository.save(user);

    return this.toSafeUser(savedUser);
  }

  async findAll(): Promise<SafeUser[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => this.toSafeUser(user));
  }

  async findOne(id: string): Promise<SafeUser> {
    const user = await this.findOneEntity(id);
    return this.toSafeUser(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<SafeUser> {
    const user = await this.findOneEntity(id);

    if (updateUserDto.firstName !== undefined) {
      user.firstName = updateUserDto.firstName.trim();
    }

    if (updateUserDto.lastName !== undefined) {
      user.lastName = updateUserDto.lastName.trim();
    }

    if (updateUserDto.email !== undefined) {
      const normalizedEmail = this.normalizeEmail(updateUserDto.email);

      if (normalizedEmail !== user.email) {
        const emailAlreadyUsed = await this.usersRepository.exists({
          where: { email: normalizedEmail },
        });

        if (emailAlreadyUsed) {
          throw new ConflictException('Email is already in use');
        }
      }

      user.email = normalizedEmail;
    }

    if (updateUserDto.password !== undefined) {
      user.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (updateUserDto.secretPhrase !== undefined) {
      user.secretPhraseHash = await bcrypt.hash(
        this.normalizeSecretPhrase(updateUserDto.secretPhrase),
        10,
      );
    }

    const savedUser = await this.usersRepository.save(user);

    return this.toSafeUser(savedUser);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async updateUserInfo(id: string): Promise<UserInfo> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        tenant: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      tenantId: user.tenant?.id ?? null,
      tenantSubdomain: user.tenant?.subdomain ?? null,
    };
  }

  private async findOneEntity(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private normalizeSecretPhrase(secretPhrase: string): string {
    return secretPhrase.trim();
  }

  private toSafeUser(user: User): SafeUser {
    const { passwordHash: _passwordHash, ...safeUser } = user;
    return safeUser;
  }
}
