export interface Player {
  id: string;
  x: number;
  y: number;
}

export interface SocketGameRes {
  id: string;
  players: Record<string, Player>;
}
