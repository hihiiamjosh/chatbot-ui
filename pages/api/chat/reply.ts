import type { NextApiRequest, NextApiResponse } from 'next';

import chatService from '@/services/server/chatService';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  chatService.pushMessage(req.body);
  res.status(200).json(null);
};

export default handler;

export const config = {
  api: {
    externalResolver: true,
  },
};
