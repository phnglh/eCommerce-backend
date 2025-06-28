import mongoose from 'mongoose';
import config from './index';
import logger from '../libs/logger';

class Database {
  private static instance: Database;

  private constructor() {
    this.connect();
  }

  private connect() {
    mongoose.set('debug', { color: true });

    mongoose
      .connect(config.databaseURL, {
        maxPoolSize: 50,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      .then(() => {
        logger.info('✅ MongoDB connected');
      })
      .catch((err) => {
        logger.error('❌ MongoDB connection error:', err);
        process.exit(1);
      });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceDatabase = Database.getInstance();
export default instanceDatabase;
