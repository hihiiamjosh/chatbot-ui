const API_ENDPOINT = '/api/conversation';

const useConversationService = () => {
  const putConversation = async (
    conversationKey: string,
    signal?: AbortSignal,
  ) => {
    const response = await fetch(`${API_ENDPOINT}/${conversationKey}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    });

    return await response.json();
  };

  const getConversation = (key: string, signal?: AbortSignal) =>
    fetch(`${API_ENDPOINT}/${key}`, {
      headers: { 'Content-Type': 'application/json' },
      signal,
    });

  return {
    putConversation,
    getConversation,
  };
};

export default useConversationService;
