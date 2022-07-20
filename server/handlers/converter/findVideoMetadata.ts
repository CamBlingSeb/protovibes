import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import type { VideoInfo } from 'types';


export async function findVideoMetadata(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session.user || !req.session.user.isLoggedIn) {
        return res.status(401).json({ success: false })
    }

    const { url } = req.body;

    try {
        const data = await axios.get('https://fastvibes-jfmyw.ondigitalocean.app/meta/query', { params: { url: url } }).then(res => res.data)
        // hit FastVibes API
        console.log('API Data: ', data);


        return res.status(200).json({
            url: url,
            fileId: data.fileId,
            title: data.title,
            channel: data.channel,
            creator: data.creator || data.channel,
            thumb: data.thumb,
            description: data.description,
            duration: data.durationString || data.duration,
            averageBitrate: data.abr,
            averageSampleRate: data.asr,
            track: data.track,
            artist: data.artist,
            album: data.album,
            releaseYear: data.releaseYear
        })
    } catch (err) {
        return res.status(404).send({ success: false })
    }
}