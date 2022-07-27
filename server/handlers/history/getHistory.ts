import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from 'server/controllers/Database';

export async function getHistory(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session.user || !req.session.user.userId) {
        return res.status(401).json({ success: false })
    }

    const userId = req.session.user.userId;

    try {
        const conversionHistory = await Database.getConversionHistory(userId);

        console.log('ConversionHistory: ', conversionHistory);

        return res.status(200).json(conversionHistory);
    } catch (err) {
        console.log('Unknown Error');
        console.error(err)
        return res.status(500).send({ success: false })
    }
}