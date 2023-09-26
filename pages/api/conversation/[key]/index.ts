import type { NextApiRequest, NextApiResponse } from 'next';

export interface PutConversationRequestBody {
  key: string;
  userContext: UserContext;
  chatContext: ChatContext;
}

export interface UserContext {
  name: string;
  email: string;
}

export interface ChatContext {
  source: string;
  callbackUrl: string;
}

const AGENT_HOST = process.env.AGENT_HOST;

const handlPut = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const conversationKey = req.query?.key as string | undefined;
    if (!conversationKey) {
      res.status(400).json(null);
      return;
    }

    const bodyObj: PutConversationRequestBody = {
      key: conversationKey,
      userContext: {
        name: 'josh',
        email: 'jhung@netbasequid.com',
      },
      chatContext: {
        source: 'auto-agent-ui',
        callbackUrl: '',
      },
    };

    await fetch(`${AGENT_HOST}/putConversation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyObj),
    });

    res.status(200).json(null);
  } catch (error) {
    console.error('error: ', error);
    res.status(500).json({ error: 'failed to put conversation!' });
  }
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const conversationKey = req.query?.key?.[0];
  if (!conversationKey) {
    res.status(400).json(null);
    return;
  }
  try {
    const agentResponse = await fetch(
      `${AGENT_HOST}/conversation/${conversationKey}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    res.status(200).json(await agentResponse.json());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to get conversation!' });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    switch (req.method) {
      case 'PUT':
        handlPut(req, res);
        break;
      case 'GET':
        handleGet(req, res);
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
