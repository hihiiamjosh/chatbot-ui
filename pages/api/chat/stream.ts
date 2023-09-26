import type { NextApiRequest, NextApiResponse } from 'next';

import chatService from '@/services/server/chatService';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  console.log('%c Line:6 🥝 sse connection start ', 'color:#33a5ff');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('X-Accel-Buffering', 'no');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Cache-Control', 'no-cache, no-transform');

  // keep connection
  const interval = setInterval(function () {
    res.write('\n\n');
  }, 15000);

  req.socket.on('close', () => {
    clearInterval(interval);
    console.log('%c Line:14 🥓 sse connection closed', 'color:#93c0a4');
  });

  chatService.subscribe((reply) => {
    try {
      const replyString = JSON.stringify(reply);
      const eventName = 'chatreply';
      res.write(`event: ${eventName}\n`);
      res.write(`id: ${+new Date()}\n`);
      res.write(`data: ${replyString}\n`);
      res.write('retry: 1000\n');
      res.write(': \n\n');
    } catch (error) {
      console.log('%c Line:23 🍖 error', 'color:#b03734', error);
    }
  });
};

export default handler;

export const config = {
  api: {
    externalResolver: true,
  },
};
