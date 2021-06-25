import { ICommand } from './ICommand';
import { IObserver } from './IObserver';

export abstract class AbstractSubject {
  private _observers: IObserver[];

  constructor() {
    this._observers = [];
  }

  public subscribe(observer: IObserver): void {
    this._observers.push(observer);
  }

  public notifyAll(command: ICommand): void {
    for (const observerFunction of this._observers) {
      observerFunction.exec(command);
    }
  }

  public observersSize(): number {
    return this._observers.length;
  }
}
