import { ChatReply } from '@/services/useChatService';

import { Conversation, Message } from '@/types/chat';

export const updateConversations = (
  updatedConversation: Conversation,
  allConversations: Conversation[],
) => {
  const updatedConversations = allConversations.map((c) => {
    if (c.id === updatedConversation.id) {
      return updatedConversation;
    }

    return c;
  });

  if (updatedConversations.length === 0) {
    updatedConversations.push(updatedConversation);
  }

  return {
    single: updatedConversation,
    all: updatedConversations,
  };
};

export const AddMessages = (
  conversation: Conversation,
  chatReply: ChatReply[] | string[],
) => {
  const updatedMessages: Message[] = [
    ...conversation.messages,
    ...chatReply.map(
      (reply) =>
        ({
          role: 'assistant',
          content: typeof reply === 'string' ? reply : reply.content,
        } as const),
    ),
  ];

  const updatedConversation = {
    ...conversation,
    messages: updatedMessages,
  };

  return updatedConversation;
};

export const saveSelectedConversation = (conversation: Conversation) => {
  localStorage.setItem('selectedConversation', JSON.stringify(conversation));
};

export const saveConversations = (conversations: Conversation[]) => {
  localStorage.setItem('conversationHistory', JSON.stringify(conversations));
};
