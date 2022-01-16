import {GameType} from './game-type';

export interface Game {
  gameId: number;
  name: string;
  trailer: string;
  content: string;
  image: string;
  gaming: number;
  flagDelete: number;
  gameType: GameType;
}
