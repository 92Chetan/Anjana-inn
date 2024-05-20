import type { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const payload = req.body;
  console.log(payload);
  res.status(200);
}
