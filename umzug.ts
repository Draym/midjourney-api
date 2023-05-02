import "tsconfig-paths/register";
import 'dotenv/config';
import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";
import {connectionParams} from "./src/db/database";

const sequelize = new Sequelize(connectionParams);

console.info("DB connection params: ", connectionParams);

const umzug = new Umzug({
  migrations: { glob: "migrations/*.ts" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  await umzug.up();
})();

export type Migration = typeof umzug._types.migration;
export { sequelize };
