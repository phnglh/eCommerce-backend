import app from './app';
import config from './config';
import logger from './libs/logger';

async function bootstrap() {
  const port = config.port;
  const server = app.listen(port, () => {
    logger.info(`WSV eCommerce start with ${port}`);
  });

  process.on('SIGINT', () => {
    server.close(() => {
      logger.info('\nExit Server Express');
      process.exit(0);
    });
  });
}

bootstrap();
