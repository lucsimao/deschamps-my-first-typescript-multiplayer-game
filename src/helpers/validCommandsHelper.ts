import { Move } from '@src/models/enum/Move';
import { IPlayer } from '@src/models/interfaces/states-attributes/IPlayer';
import { IScreen } from '@src/models/interfaces/states-attributes/IScreen';

const validCommands = {
  [Move.UP]: (player: IPlayer): void => {
    const y = player.y;
    player.y = y - 1 >= 0 ? y - 1 : y;
  },
  [Move.DOWN]: (player: IPlayer, screen: IScreen): void => {
    const y = player.y;
    player.y = y + 1 < screen.height ? y + 1 : y;
  },
  [Move.LEFT]: (player: IPlayer): void => {
    const x = player.x;
    player.x = x - 1 >= 0 ? x - 1 : x;
  },
  [Move.RIGHT]: (player: IPlayer, screen: IScreen): void => {
    const x = player.x;
    player.x = x + 1 < screen.width ? x + 1 : x;
  },
};
export { validCommands };
