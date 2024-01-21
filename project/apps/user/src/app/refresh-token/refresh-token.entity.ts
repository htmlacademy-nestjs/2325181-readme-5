import { Entity } from '@project/libs/shared/core';
import { TokenDescription } from '@project/libs/shared/app/types';

export class RefreshTokenEntity implements TokenDescription, Entity<string, TokenDescription> {
  public id?: string;
  public tokenId: string;
  public createdAt: Date;
  public userId: string;
  public expiresIn: Date;

  constructor(refreshToken: TokenDescription) {
    this.populate(refreshToken);
  }

  public populate(entity: TokenDescription): void {
    this.userId = entity.userId;
    this.id = entity.id;
    this.tokenId = entity.tokenId;
    this.createdAt = entity.createdAt || new Date();
    this.expiresIn = entity.expiresIn;
  }

  public toPOJO(): TokenDescription {
    return {
      id: this.id,
      userId: this.userId,
      tokenId: this.tokenId,
      createdAt: this.createdAt,
      expiresIn: this.expiresIn
    };
  }

  static fromObject(data: TokenDescription): RefreshTokenEntity {
    return new RefreshTokenEntity(data);
  }
}
