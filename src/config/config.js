import { config as loadEnv } from 'dotenv';
loadEnv();

import { Command } from 'commander';

const program = new Command();

program
  .option('-m, --mode <mode>', 'Server mode', 'prod')
  .parse(process.argv);

const { mode } = program.opts();

loadEnv({ 
  path: mode === 'dev' ? './.env' : './.env' 
});

const configuration = {
  app: {
    PORT: process.env.PORT || 8080,
  },
  mongo: {
    URL: process.env.MONGODB_URI || 'mongodb+srv://facuvigano14:yE00R6XljQDLwGwN@backend-ii-entrega.3d7cyte.mongodb.net/base6?retryWrites=true&w=majority&appName=Backend-II-Entrega',
  },
};

export default configuration;
