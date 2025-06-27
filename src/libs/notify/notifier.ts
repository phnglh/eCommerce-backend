import { NotifyChannel } from './channels/notify-channel.interface';

export class Notifier {
  private channels: NotifyChannel[] = [];

  addChannel(channel: NotifyChannel) {
    this.channels.push(channel);
  }

  async notifyAll(message: string) {
    for (const channel of this.channels) {
      await channel.send(message);
    }
  }
}
