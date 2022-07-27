import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'server/lib/session';
import { getHistory } from 'server/handlers/history/getHistory';

export default withIronSessionApiRoute(GetHistoryRoute, sessionOptions);

async function GetHistoryRoute(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return await getHistory(req, res);
}