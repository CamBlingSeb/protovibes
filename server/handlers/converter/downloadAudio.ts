import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import config from 'common/requestConfig';
import stream from 'stream';
import { promisify } from 'util';

const pipeline = promisify(stream.pipeline);

const MIMETYPE: { [format: string]: string } = {
    mp3: 'audio/mpeg',
    flac: 'audio/x-flac',
    wav: 'audio/x-wav'
}

// /api/converter/download/{fileId}/{fileFormat}/{fileName}
export async function downloadAudio(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session.user || !req.session.user.isLoggedIn) {
        return res.status(401).json({ success: false })
    }

    // const fileId = req.query.fileId as string;
    // const { fileName } = req.body;
    const [fileId, fileFormat, title] = req.query.params as string[];
    console.log('DownloadParams: ', fileId, ' ', title, ' ', fileFormat);
    try {
        // const body = {
        //     filename: `${fileId}.${fileFormat}`
        // }
        res.setHeader('Content-Type', MIMETYPE[fileFormat]);
        res.setHeader('Content-Disposition', `attachment; filename=${title}.${fileFormat}`);

        const fileResponse = await axios.get(
            `https://fastvibes-jfmyw.ondigitalocean.app/download/audio?fileId=${fileId}&fileFormat=${fileFormat}`,
            {
                responseType: 'stream'
            });

        const fileStream = fileResponse.data;

        // fileStream.on('data')
        // console.log('fileStream: ', fileStream);


        return await pipeline(fileStream, res);
    } catch (err) {
        console.log('Unknown Error');
        console.error(err)
        return res.status(500).send({ success: false })
    }
}