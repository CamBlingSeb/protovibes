import executeQuery from "server/lib/connectors/mysqlConnect";
import {
    User,
    Source,
    CombinedMetadata
} from '../schemas';
import {
    NotAuthorizedError
} from '../errors'

export class Database {
    /* Users */
    static async findUserByAccessCode(accessCode: string) {
        const query = 'SELECT user_id, access_code FROM users WHERE access_code = ?';
        const val = [accessCode];

        try {
            const result = await executeQuery({
                query: query,
                values: val
            }) as User[]

            if (result.length === 0) {
                throw new NotAuthorizedError();
            }
            // console.log('User Search Result: ', result[0]);

            return {
                userId: result[0].user_id,
                accessCode: result[0].access_code
            };
        } catch (err) {
            // console.log(err);
            return null;
        }
    }

    /* Sources */
    static async findSavedSourceById(sourceId: string) {
        console.log('Searching for source By Id: ', sourceId);

        const query = `
            SELECT * FROM (    
                SELECT 
                    sources.id AS sourceId, 
                    sources.thumb AS thumb,
                    sources.url AS url,
                    sources.title AS title, 
                    sources.channel AS channel, 
                    sources.description AS description, 
                    sources.bit_rate AS bit_rate, 
                    sources.sample_rate AS sample_rate, 
                    sources.duration AS duration,
                    sources.duration_string AS durationString,
                    tracks.id AS trackId,
                    tracks.title AS track, 
                    tracks.bpm AS bpm, 
                    tracks.release_date AS releaseDate,
                    artists.id AS artistId,
                    artists.name AS artist, 
                    artists.thumb_url AS artistThumb,
                    artists.bio AS artistBio
                    FROM sources 
                JOIN tracks 
                    ON sources.track_id = tracks.id 
                JOIN artists 
                    ON tracks.artist_id = artists.id
            ) AS SOURCEDATA WHERE SOURCEDATA.sourceId = ?`;

        const val = [sourceId];

        try {
            const result = await executeQuery({
                query: query,
                values: val
            }) as CombinedMetadata[];

            // console.log('source search result: ', result);

            if (result.length === 0) {
                return null;
            }

            const {
                sourceId,
                thumb,
                url,
                title,
                channel,
                description,
                bit_rate,
                sample_rate,
                duration,
                durationString,
                trackId,
                track,
                bpm,
                releaseDate,
                artistId,
                artist,
                artistThumb,
                artistBio
            } = result[0];

            return {
                fileId: sourceId,
                thumb: thumb,
                url: url,
                title: title,
                channel: channel,
                description: description,
                averageBitrate: bit_rate,
                averageSampleRate: sample_rate,
                duration: duration,
                durationString: durationString,
                trackId: trackId,
                track: track,
                bpm: bpm,
                releaseDate: releaseDate && releaseDate.toLocaleString('en-US', { month: "numeric", day: "numeric", year: "numeric" }),
                artistId: artistId,
                artist: artist,
                artistThumb: artistThumb,
                artistBio: artistBio
            }
        } catch (err) {
            return null;
        }
    }

    static async storeSourceData(sourceData: Source) {
        const query = 'INSERT INTO sources SET ?';
        const val = [sourceData];

        try {
            const result = await executeQuery({
                query: query,
                values: val
            })

            // console.log('Source Insertion Result: ', result);
            return result;
        } catch (err) {
            console.log(err);
            return null
        }
    }

    /* Artists */
    static async storeArtistData({
        artist,
        artistThumb,
        bio,
        mbid
    }: {
        artist: string,
        artistThumb: string,
        bio: string,
        mbid?: string
    }) {

        try {
            // Check for existing artist

            const query1 = mbid ? 'SELECT id, name, mbid FROM artists WHERE mbid = ? OR name = ?' : 'SELECT name, mbid FROM artists WHERE name = ?';
            const val1 = mbid ? [mbid, artist] : [artist];

            const checkResult = await executeQuery({
                query: query1,
                values: val1
            })

            console.log('checkResult: ', checkResult);
            if (checkResult.length > 0) {
                return {
                    artist: checkResult[0].name,
                    artistId: checkResult[0].id
                }
            }

            // Insert new artist if none found
            const query2 = 'INSERT INTO artists SET ?';
            const initialArtist = {
                name: artist,
                thumb_url: artistThumb,
                bio: bio,
                mbid: mbid
            }

            const val2 = [initialArtist];
            const result = await executeQuery({
                query: query2,
                values: val2
            })
            const artistId = result.insertId;

            return {
                artist: artist,
                artistId: artistId
            };
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    /* Tracks */

    static async storeTrackData({
        trackTitle,
        artistId,
        releaseDate,
        isrc,
        deezerId,
        bpm
    }: {
        trackTitle: string;
        artistId: number;
        releaseDate: Date | string;
        isrc: string;
        deezerId: string;
        bpm: number
    }) {

        try {
            // check for existing track by name and artist
            const query1 = 'SELECT * FROM tracks WHERE title = ? AND artist_id = ?';
            const val1 = [trackTitle, artistId];

            const checkResult = await executeQuery({
                query: query1,
                values: val1
            })

            console.log('checkResult: ', checkResult);
            if (checkResult.length > 0) {
                return {
                    title: checkResult[0].title,
                    trackId: checkResult[0].id,
                    artistId: checkResult[0].artist_id
                }
            }

            const query2 = 'INSERT INTO tracks SET ?';
            const initialTrack = {
                title: trackTitle,
                artist_id: artistId,
                release_date: releaseDate,
                bpm: bpm,
                deezer_id: deezerId,
                isrc: isrc
            }

            const val2 = [initialTrack];
            const result = await executeQuery({
                query: query2,
                values: val2
            })
            const trackId = result.insertId;

            return {
                title: trackTitle,
                trackId: trackId,
                artistId: artistId
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    static async storeConversionData({
        userId,
        sourceId,
        format
    }: {
        userId: number;
        sourceId: string;
        format: string;
    }) {
        const query = 'INSERT INTO conversions SET ?';
        const conversionData = {
            source_id: sourceId,
            user_id: userId,
            format: format
        }
        const val = [conversionData];

        try {
            const result = await executeQuery({
                query: query,
                values: val
            })
            const conversionId = result.insertId;

            return {
                conversionId: conversionId
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    static async getConversionHistory(userId: number) {
        const query = `
            SELECT * FROM (
                SELECT 
                    users.user_id AS user, 
                    source_id, 
                    format, 
                    url, 
                    thumb, 
                    tracks.title AS track, 
                    artists.name AS artist, 
                    conversions.created_at 
                    FROM conversions 
                JOIN users 
                    ON conversions.user_id = users.user_id  
                JOIN sources 
                    ON conversions.source_id = sources.id  
                JOIN tracks 
                    ON sources.track_id = tracks.id  
                JOIN artists 
                    ON tracks.artist_id = artists.id  
                ORDER BY conversions.created_at DESC
            ) AS HISTORY WHERE HISTORY.user = ?`;

        const val = [userId];

        try {
            const history = await executeQuery({
                query: query,
                values: val
            })
            // console.log('History Query Res: ', history);

            if (history.length === 0) return [];

            return [...history]
        } catch (err) {
            console.log(err);
            return [];
        }
    }


}