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
  chatReply: ChatReply[],
) => {
  const updatedMessages: Message[] = [
    ...conversation.messages,
    ...chatReply.map(
      ({ content }) => ({ role: 'assistant', content } as const),
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
