import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../../server/lib/session'
import { NextApiRequest, NextApiResponse } from 'next'


export default withIronSessionApiRoute(LogoutRoute, sessionOptions);

function LogoutRoute(req: NextApiRequest, res: NextApiResponse) {
    req.session.destroy();
    res.json({ isLoggedIn: false, userId: '', username: '' })
}