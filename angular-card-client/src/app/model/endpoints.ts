export const SERVER_BASE = 'http://localhost:3000/';
export const GET_CARDS = 'cards';
export const POST_STATUS = 'cardStatus';

export interface CardError {
  error: string;
  cause: string;
}
