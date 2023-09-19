import { useContext, useEffect, useMemo, useRef, useState } from 'react';

interface Reply {
  conversationKey: string;
  content: string;
}

export const useChatStream = (handler: (data: Reply) => void) => {
  const eventSourceRef = useRef<EventSource>();

  useEffect(() => {
    eventSourceRef.current = new EventSource('/api/chat/stream');
    console.log('%c Line:13 🍿 start streaming', 'color:#33a5ff');
    return () => {
      console.log('%c Line:26 🍑 end streaming', 'color:#93c0a4');
      eventSourceRef.current?.close();
    };
  }, []);

  useEffect(() => {
    const onChatreply = (event: MessageEvent) => {
      const chatReply = JSON.parse(event.data);
      handler(chatReply);
    };
    const eventSource = eventSourceRef.current;
    if (eventSource) {
      eventSource.addEventListener('chatreply', onChatreply);

      eventSource.onerror = (e) => {
        console.log('%c Line:25 🌽 streaming error', 'color:#b03734', e);
      };
    }

    return () => {
      eventSource?.removeEventListener('chatreply', onChatreply);
    };
  }, [handler]);

  // return chatReply;
};
