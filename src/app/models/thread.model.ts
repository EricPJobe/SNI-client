export type Thread = {
  id: string;
  name: string;
  type: string;
  iconUrl?: string;
  ownerId: string;
  guildId?: string;
  channelId?: string;
  messageCount?: number;
  memberCount?: number;
  isPinned?: boolean;
  isArchived?: boolean;
  isLocked?: boolean;
  isPrivate?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
