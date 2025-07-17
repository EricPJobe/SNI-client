export type Message = {
  id: string;
  userId: string;
  body: string;
  guildId?: string;
  threadId?: string;
  channelId?: string;
  isArchived?: boolean;
  isLocked?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
  isSystem?: boolean;
  isBot?: boolean;
  isPrivate?: boolean;
  isPinned?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
