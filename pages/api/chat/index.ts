import type { NextApiRequest, NextApiResponse } from 'next';

const AGENT_HOST = process.env.AGENT_HOST;

interface ConsumeOpenAIMessageBody {
  conversationKey: string;
  openAIMessage: {
    role: string;
    content: string;
  };
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const { conversationKey, message } = req.body;
    const bodyObj: ConsumeOpenAIMessageBody = {
      conversationKey,
      openAIMessage: {
        role: 'user',
        content: message,
      },
    };

    console.log('%c Line:14 🍏 chat', 'color:#465975', {
      url: `${AGENT_HOST}/conversation/consumeOpenAIMessage`,
      bodyObj,
    });

    const agentResponse = await fetch(
      `${AGENT_HOST}/conversation/consumeOpenAIMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyObj),
      },
    );
    res.status(200).json(await agentResponse.json());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to consume OpenAI message!' });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    switch (req.method) {
      case 'POST':
        handlePost(req, res);
        break;
      default:
        throw new Error('unsupported http method');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'unexpected error!' });
  }
};

export default handler;

export const config = {
  api: {
    externalResolver: true,
  },
};
