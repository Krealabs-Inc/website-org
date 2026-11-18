import * as migration_20261117_231641_init from './20261117_231641_init';
import * as migration_20261117_232249_team from './20261117_232249_team';
import * as migration_20261117_232650_projects from './20261117_232650_projects';
import * as migration_20261117_232917_glossary_cities_sectors from './20261117_232917_glossary_cities_sectors';
import * as migration_20261117_233043_faq from './20261117_233043_faq';
import * as migration_20261117_233338_posts from './20261117_233338_posts';
import * as migration_20261118_000111_page_home from './20261118_000111_page_home';
import * as migration_20261118_000805_page_services from './20261118_000805_page_services';

export const migrations = [
  {
    up: migration_20261117_231641_init.up,
    down: migration_20261117_231641_init.down,
    name: '20261117_231641_init',
  },
  {
    up: migration_20261117_232249_team.up,
    down: migration_20261117_232249_team.down,
    name: '20261117_232249_team',
  },
  {
    up: migration_20261117_232650_projects.up,
    down: migration_20261117_232650_projects.down,
    name: '20261117_232650_projects',
  },
  {
    up: migration_20261117_232917_glossary_cities_sectors.up,
    down: migration_20261117_232917_glossary_cities_sectors.down,
    name: '20261117_232917_glossary_cities_sectors',
  },
  {
    up: migration_20261117_233043_faq.up,
    down: migration_20261117_233043_faq.down,
    name: '20261117_233043_faq',
  },
  {
    up: migration_20261117_233338_posts.up,
    down: migration_20261117_233338_posts.down,
    name: '20261117_233338_posts',
  },
  {
    up: migration_20261118_000111_page_home.up,
    down: migration_20261118_000111_page_home.down,
    name: '20261118_000111_page_home',
  },
  {
    up: migration_20261118_000805_page_services.up,
    down: migration_20261118_000805_page_services.down,
    name: '20261118_000805_page_services'
  },
];
