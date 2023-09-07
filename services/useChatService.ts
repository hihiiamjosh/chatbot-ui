import { useContext } from 'react';
import toast from 'react-hot-toast';

import HomeContext from '@/pages/api/home/home.context';

const API_ENDPOINT = '/api/chat';

export interface ChatReply {
  content: string;
}

const useChatService = () => {
  const { dispatch: homeDispatch } = useContext(HomeContext);

  const chat = async (
    conversationKey: string,
    message: string,
    signal?: AbortSignal,
  ) => {
    homeDispatch({ field: 'loading', value: true });
    homeDispatch({ field: 'messageIsStreaming', value: true });

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversationKey, message }),
        signal,
      });

      if (!response.ok) {
        homeDispatch({ field: 'loading', value: false });
        homeDispatch({ field: 'messageIsStreaming', value: false });
        toast.error(response.statusText);
        return undefined;
      }

      const result = (await response.json()) as ChatReply[];
      homeDispatch({ field: 'loading', value: false });
      homeDispatch({ field: 'messageIsStreaming', value: false });
      return result;
    } catch (error) {
      homeDispatch({ field: 'loading', value: false });
      homeDispatch({ field: 'messageIsStreaming', value: false });
      toast.error('failed to chat');
    }
  };

  return {
    chat,
  };
};

export default useChatService;
