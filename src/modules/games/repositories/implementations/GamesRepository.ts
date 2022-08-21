import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    return this.repository
      .createQueryBuilder("game").where(`game.title ILIKE '%${param}%'`).getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query
    return this.repository.query("SELECT COUNT(*) FROM games");
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    return this.repository.createQueryBuilder().relation("users").of(id).loadMany();
  }
}
