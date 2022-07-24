import { NextApiRequest, NextApiResponse } from 'next';
import { CurrentUser } from '../../lib/session';

const accessCodes = ['rabbit', 'silkworm', 'ajax', 'hoops']

export async function handleAccessCode(req: NextApiRequest, res: NextApiResponse) {
    const { accessCode } = await req.body;

    try {
        const accessCodeIndex = accessCodes.indexOf(accessCode);
        // check db for access code
        if (accessCodeIndex === -1) {
            return res.status(401).json({ isLoggedIn: false, accessCode: '' })
        }

        // create session object
        const currentUser = { isLoggedIn: true, accessCode: accessCode } as CurrentUser;

        // store & save session object
        req.session.user = currentUser;
        await req.session.save();

        return res.json(currentUser);
    } catch (err) {
        return res.status(500).json({ isLoggedIn: false, accessCode: '' })
    }
}