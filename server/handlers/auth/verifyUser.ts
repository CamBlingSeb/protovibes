import { NextApiRequest, NextApiResponse } from 'next';
import { CurrentUser } from '../../lib/session';

export async function verifyUser(req: NextApiRequest, res: NextApiResponse<CurrentUser>) {
    if (req.session.user) {
        return res.json({
            isLoggedIn: true,
            accessCode: req.session.user.accessCode
        })
    } else {
        return res.json({
            isLoggedIn: false,
            accessCode: ''
        })
    }
}