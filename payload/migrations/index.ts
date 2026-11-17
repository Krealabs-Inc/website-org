import * as migration_20261117_231641_init from './20261117_231641_init';

export const migrations = [
  {
    up: migration_20261117_231641_init.up,
    down: migration_20261117_231641_init.down,
    name: '20261117_231641_init'
  },
];
