import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions, CurrentUser } from '../../../server/lib/session';
import { handleAccessCode } from '../../../server/handlers/auth/handleAccessCode';

export default withIronSessionApiRoute(AuthenticationRoute, sessionOptions);

async function AuthenticationRoute(
    req: NextApiRequest,
    res: NextApiResponse<CurrentUser>
) {
    return await handleAccessCode(req, res)
}