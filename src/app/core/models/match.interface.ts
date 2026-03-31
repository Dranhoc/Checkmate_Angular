import { Status } from '@core/enums/status.enum';

export interface Match {
  id: number;
  tournamentId: number;
  white_userId: string;
  black_userId: string;
  isNull: boolean;
  winner: string | null;
  tournament_round: number;
  status: Status;
}
export interface MatchWithPlayers extends Match {
  result?: string;
  whitePlaying: {
    id: string;
    pseudo: string;
    elo: number;
  };
  blackPlaying: {
    id: string;
    pseudo: string;
    elo: number;
  };
  updatedAt?: Date;
}

export interface PayloadMatchUpdate {
  winner: string | null;
  isNull: string;
  status: string;
}
