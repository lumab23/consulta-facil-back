import { Request } from 'express';
import type { User } from 'src/modules/database/entities/user.entity';

export type SafeUser = Omit<User, 'password' | 'salt'>;

export interface RequestWithUser extends Request {
    user: SafeUser;
}