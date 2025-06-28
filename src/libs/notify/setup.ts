import { Notifier } from './notifier';
import { DiscordChannel } from './channels/discord.channel';

export function createNotifier(): Notifier {
  const notifier = new Notifier();

  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  if (discordWebhook) {
    notifier.addChannel(new DiscordChannel(discordWebhook));
  }

  // Later: add Slack, Email here
  return notifier;
}
