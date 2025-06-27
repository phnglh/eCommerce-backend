import 'dotenv/config'
import app from "./src/app";
import { createNotifier } from "./src/libs/notify/setup";

const PORT = process.env.PORT || 3056;

const notifier = createNotifier();

const server = app.listen(PORT, () => {
  console.log(`WSV is running on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Closing server...');
  
  server.close(async () => {
    console.log('Exit Server Express');
    try {
      await notifier.notifyAll(`Server stopped at ${new Date().toLocaleString()}`);
    } catch (err) {
      console.error('Notify failed:', err);
    } finally {
      process.exit(0); 
    }
  });
});

