import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req?.method) {
    case 'GET': {
      res.status(200).json('GET');
      break;
    }
    case 'POST': {
      res.status(200).json('POST');
      break;
    }
  }
}
