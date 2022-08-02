import { NextApiRequest, NextApiResponse } from 'next';
import { CurrentUser } from '../../lib/session';
import { Database } from '../../controllers/Database';

export async function handleAccessCode(req: NextApiRequest, res: NextApiResponse) {
    const { accessCode } = await req.body;

    try {
        // check db for access code
        const result = await Database.findUserByAccessCode(accessCode);
        console.log('Result: ', result);

        if (!result) {
            return res.status(401).json({ isLoggedIn: false, userId: 0, accessCode: '' })
        }

        // create session object
        const currentUser = { isLoggedIn: true, userId: result.userId, accessCode: result.accessCode } as CurrentUser;

        // store & save session object
        req.session.user = currentUser;
        await req.session.save();

        return res.json(currentUser);
    } catch (err) {
        req.session.destroy();
        return res.json({ isLoggedIn: false, userId: 0, accessCode: '' })
    }
}