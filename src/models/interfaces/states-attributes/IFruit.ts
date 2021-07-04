import { IGameElement } from './IGameElement';

export interface IFruit extends IGameElement {
  fruitId: string;
  fruitName?: string;
}
