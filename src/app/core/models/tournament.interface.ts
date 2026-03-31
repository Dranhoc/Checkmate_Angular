import { Status } from '@core/enums/status.enum';
import { Categories } from '@core/enums/categories.enum';
import { Category } from './category.interface';
import { UserData } from './user.interface';
import { MatchWithPlayers } from './match.interface';

export interface Tournament {
  id: number;
  name: string;
  location: string;
  min_player: number;
  max_player: number;
  min_elo: number;
  max_elo: number;
  current_round: number;
  woman_only: boolean;
  end_inscription_date: Date;
  status: Status;
  category: Array<Category>;
  participantsCount: number;
  participant: Array<UserData>;
  currentMatches: Array<MatchWithPlayers>;
}

export interface TournamentPayload {
  name: string;
  location: string;
  min_player: number;
  max_player: number;
  min_elo: number;
  max_elo: number;
  woman_only: boolean;
  categories: Array<Categories>;
  current_round: number;
  end_inscription_date: string;
  status: string;
}
