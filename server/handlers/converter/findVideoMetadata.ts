import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import type { VideoInfo } from 'types';
import { Database } from 'server/controllers/Database';

const API_ROOT_URL_LOCAL = "http://localhost:5000";
const API_ROOT_URL_REMOTE = "https://fastvibes-jfmyw.ondigitalocean.app";

export async function findVideoMetadata(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session.user || !req.session.user.isLoggedIn) {
        return res.status(401).json({ success: false })
    }

    const { id, url } = req.body;

    try {
        // check database for existing source data
        const existingSource = await Database.findSavedSourceById(id);
        if (existingSource) {
            console.log('Existing Source Found: ', existingSource);
            return res.status(200).json(existingSource);
        }
        console.log('No Existing Source Data, fetching...');

        // hit FastVibes API
        const data = await axios.get('https://fastvibes-jfmyw.ondigitalocean.app/meta/query', { params: { url: url } }).then(res => res.data)
        console.log('API Data: ', data);

        // store artist in database
        const artistData = await Database.storeArtistData(data.artist);
        const artistId = artistData && artistData.artistId;
        console.log('Artist ID: ', artistId);
        // store track in database
        const trackData = await Database.storeTrackData(data.track, artistId);
        const trackId = trackData && trackData.trackId;
        console.log('Track ID: ', trackId);

        // store source data in database
        const sourceData = await Database.storeSourceData({
            id: data.fileId,
            title: data.title,
            channel: data.channel,
            url: url,
            thumb: data.thumb,
            description: data.description,
            duration: data.duration,
            duration_string: data.durationString,
            sample_rate: data.asr,
            bit_rate: data.abr,
            track_id: trackId
        });

        console.log('InsertionResult: ', sourceData);

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
        console.log('Metadata Error: ', err)
        return res.status(404).send({ success: false })
    }
}