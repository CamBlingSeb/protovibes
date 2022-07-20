import { NextApiRequest, NextApiResponse } from 'next';
import { CurrentUser } from '../../lib/session';

export async function handleAccessCode(req: NextApiRequest, res: NextApiResponse) {
    const { accessCode } = await req.body;

    try {
        // check db for access code
        if (accessCode !== '1234') {
            return res.status(401).json({ success: false })
        }

        // create session object
        const currentUser = { isLoggedIn: true, accessCode: accessCode } as CurrentUser;

        // store & save session object
        req.session.user = currentUser;
        await req.session.save();

        return res.json(currentUser);
    } catch (err) {
        return res.status(500)
    }
}