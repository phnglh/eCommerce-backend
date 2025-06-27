import { NotifyChannel } from './notify-channel.interface';

export class DiscordChannel implements NotifyChannel {
  constructor(private webhookUrl: string) {}

  async send(message: string): Promise<void> {
    try {
      await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message }),
      });
      console.log('[Discord] Message sent');
    } catch (err) {
      console.error('[Discord] Failed:', err);
    }
  }
}
