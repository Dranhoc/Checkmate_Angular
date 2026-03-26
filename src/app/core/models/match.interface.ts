import { Status } from '@core/enums/status.enum';

export interface Match {
  id: number;
  tournamentId: number;
  white_userId: string;
  black_userId: string;
  isNull: boolean;
  winner: string;
  tournament_round: number;
  status: Status;
}
