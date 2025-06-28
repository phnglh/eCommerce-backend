import app from './app';
import config from './config';

async function bootstrap() {
  const port = config.port
  const server = app.listen(port, () => {
    console.info(`WSV eCommerce start with ${port}`);
  });

  process.on('SIGINT', () => {
    server.close(() => console.log(`\nExit Server Express`));
  });
}

bootstrap();
