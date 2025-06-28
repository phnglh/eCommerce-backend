import { NotifyChannel } from './notify-channel.interface';
import axios from 'axios';

export class DiscordChannel implements NotifyChannel {
  constructor(private webhookUrl: string) {}

  async send(message: string): Promise<void> {
    try {
      await axios.post(
        this.webhookUrl,
        { content: message },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000,
        },
      );
      console.log('[Discord] Message sent');
    } catch (err) {
      console.error('[Discord] Failed:', err);
    }
  }
}
