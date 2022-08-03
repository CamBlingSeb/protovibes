import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
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
            // console.log('Existing Source Found: ', existingSource);
            return res.status(200).json(existingSource);
        }
        console.log('No Existing Source Data, fetching...');

        // hit FastVibes API
        const data = await axios.get('http://127.0.0.1:5000/meta/yt', { params: { url: url } }).then(res => res.data)
        // console.log('API Data: ', data);

        // store artist in database
        const artistData = await Database.storeArtistData({
            artist: data.artist,
            artistThumb: data.artistThumb,
            bio: data.artistBio,
            mbid: data.artistMBID
        });
        const artistId = artistData && artistData.artistId;
        // store track in database
        const trackData = await Database.storeTrackData({
            trackTitle: data.track,
            artistId: artistId,
            releaseDate: data.releaseDate,
            isrc: data.isrc,
            deezerId: data.dzid,
            bpm: data.bpm
        });
        const trackId = trackData && trackData.trackId;

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

        // console.log('InsertionResult: ', sourceData);


        return res.status(200).json({
            fileId: data.fileId,
            thumb: data.thumb,
            url: url,
            title: data.title,
            channel: data.channel,
            description: data.description,
            averageBitrate: data.abr,
            averageSampleRate: data.asr,
            duration: data.duration,
            durationString: data.durationString,
            trackId: trackId,
            track: data.track,
            bpm: data.bpm,
            releaseDate: data.releaseDate,
            artistId: artistId,
            artist: data.artist,
            artistThumb: data.artistThumb,
            artistBio: data.artistBio
        })
    } catch (err) {
        console.log('Metadata Error: ', err)
        return res.status(404).send({ success: false })
    }
}