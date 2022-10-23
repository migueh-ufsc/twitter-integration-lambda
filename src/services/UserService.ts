import { IUser } from 'contracts/entities/IUser';
import { UserModel } from 'infra/database/schemas/UserSchema';
import { logger } from 'infra/logger';
import { FilterQuery } from 'mongoose';
import { BaseService } from './BaseService';

export class UserService extends BaseService<IUser> {
  constructor() {
    super(UserModel);
  }

  public async findOne(query: FilterQuery<IUser>): Promise<IUser> {
    try {
      return await this.model.findOne(query).lean();
    } catch (error) {
      logger.error('Error while trying to find documents on database', {
        name: this.model.modelName,
        query,
      });
    }
  }

  public async findById(id: string): Promise<IUser> {
    try {
      return await this.model.findOne({
        id,
      });
    } catch (error) {
      logger.error('Error while trying to find User by id', {
        name: this.model.modelName,
        id,
      });
    }
  }

  public async findByUsername(username: string): Promise<IUser> {
    try {
      return await this.model.findOne({
        username,
      });
    } catch (error) {
      logger.error('Error while trying to find User by username', {
        name: this.model.modelName,
        username,
      });
    }
  }
}
