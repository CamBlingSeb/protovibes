import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'server/lib/session';
import { findVideoMetadata } from 'server/handlers/converter/findVideoMetadata';

export default withIronSessionApiRoute(FindVideoRoute, sessionOptions);

async function FindVideoRoute(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return await findVideoMetadata(req, res);
}