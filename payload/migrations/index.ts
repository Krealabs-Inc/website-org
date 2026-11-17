import * as migration_20261117_231641_init from './20261117_231641_init';
import * as migration_20261117_232249_team from './20261117_232249_team';

export const migrations = [
  {
    up: migration_20261117_231641_init.up,
    down: migration_20261117_231641_init.down,
    name: '20261117_231641_init',
  },
  {
    up: migration_20261117_232249_team.up,
    down: migration_20261117_232249_team.down,
    name: '20261117_232249_team'
  },
];
