import { IGameElement } from '@src/models/interfaces/states-attributes/IGameElement';

const isCollidingElements = (
  firstElement: IGameElement,
  secondElement: IGameElement
): boolean => {
  return (
    firstElement.x === secondElement.x && firstElement.y === secondElement.y
  );
};

export { isCollidingElements };
