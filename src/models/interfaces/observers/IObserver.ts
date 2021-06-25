import { ICommand } from './ICommand';

export interface IObserver {
  exec(command: ICommand): void;
}
