export interface NotifyChannel {
  send(message: string): Promise<void>;
}
