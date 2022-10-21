import { IUser } from 'contracts/entities/IUser';
import { UserModel } from 'infra/database/schemas/UserSchema';
import { logger } from 'infra/logger';
import { BaseService } from './BaseService';

export class UserService extends BaseService<IUser> {
  constructor() {
    super(UserModel);
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
