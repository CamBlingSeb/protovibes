import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import config from 'common/requestConfig';
import { Database } from 'server/controllers/Database';

export async function convertVideoToAudio(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session.user || !req.session.user.isLoggedIn || !req.session.user.userId) {
        return res.status(401).json({ success: false })
    }

    const userId = req.session.user.userId;

    const {
        url,
        fileId,
        title,
        fileFormat
    } = req.body;

    try {
        const body = {
            url,
            fileId,
            title,
            fileFormat
        }

        const response = await axios.post('https://fastvibes-jfmyw.ondigitalocean.app/convert/audio', body, config);

        if (response.status !== 200 || !response.data.hasOwnProperty('filename')) {
            console.log('Bad Response');
            return res.status(500).send({ success: false })
        }

        await Database.storeConversionData({
            userId: userId,
            sourceId: fileId,
            format: fileFormat
        })

        return res.status(200).json({
            success: true,
            title: response.data.title,
            fileName: response.data.filename
        })
    } catch (err) {
        console.log('Unknown Error');
        console.error(err)
        return res.status(500).send({ success: false })
    }
}