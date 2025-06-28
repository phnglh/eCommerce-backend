import { NotifyChannel } from './channels/notify-channel.interface';

export class Notifier {
  private channels: NotifyChannel[] = [];

  addChannel(channel: NotifyChannel) {
    this.channels.push(channel);
  }

  async notifyAll(message: string) {
    await Promise.allSettled(
      this.channels.map((channel) => channel.send(message)),
    );
  }
}
