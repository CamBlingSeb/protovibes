import { NextApiRequest, NextApiResponse } from 'next';
import { CurrentUser } from '../../lib/session';

export async function verifyUser(req: NextApiRequest, res: NextApiResponse<CurrentUser>) {
    console.log('Verifying User: ', req.session.user);
    if (req.session.user) {
        return res.json({
            ...req.session.user,
            isLoggedIn: true
        })
    } else {
        return res.json({
            isLoggedIn: false,
            userId: 0,
            accessCode: ''
        })
    }
}