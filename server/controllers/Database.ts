import executeQuery from "server/lib/connectors/mysqlConnect";
import {
    User,
    Source
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
        const query = 'SELECT * FROM sources WHERE id = ?';
        const val = [sourceId];

        try {
            const result = await executeQuery({
                query: query,
                values: val
            }) as Source[];

            console.log('source search result: ', result);

            if (result.length === 0) {
                return null;
            }

            const {
                id,
                title,
                channel,
                url,
                thumb,
                description,
                duration,
                duration_string,
                sample_rate,
                bit_rate,
                track_id
            } = result[0];

            return {
                fileId: id,
                title: title,
                channel: channel,
                url: url,
                thumb: thumb,
                description: description,
                duration: duration_string || duration,
                averageBitrate: bit_rate,
                averageSampleRate: sample_rate,
                trackId: track_id
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

            console.log('Source Insertion Result: ', result);
            return result;
        } catch (err) {
            console.log(err);
            return null
        }
    }

    /* Artists */
    static async storeArtistData(artist: string) {
        /**@todo - check for preexisting artist before inserting */
        const query = 'INSERT INTO artists SET ?';
        const initialArtist = {
            name: artist
        }

        const val = [initialArtist];

        try {
            const result = await executeQuery({
                query: query,
                values: val
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

    static async storeTrackData(trackTitle: string, artistId: number) {
        /**@todo - check for preexisting track before inserting */
        const query = 'INSERT INTO tracks SET ?';
        const initialTrack = {
            title: trackTitle,
            artist_id: artistId
        }

        const val = [initialTrack];

        try {
            const result = await executeQuery({
                query: query,
                values: val
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
        const query = "SELECT * FROM (SELECT users.user_id AS user, source_id, format, url, thumb, tracks.title AS track, artists.name AS artist, conversions.created_at FROM conversions " +
            "JOIN users ON conversions.user_id = users.user_id " +
            "JOIN sources ON conversions.source_id = sources.id " +
            "JOIN tracks ON sources.track_id = tracks.id " +
            "JOIN artists ON tracks.artist_id = artists.id " +
            "ORDER BY conversions.created_at DESC) AS HISTORY WHERE HISTORY.user = ?";

        const val = [userId];

        try {
            const history = await executeQuery({
                query: query,
                values: val
            })
            console.log('History Query Res: ', history);

            if (history.length === 0) return [];

            return [...history]
        } catch (err) {
            console.log(err);
            return [];
        }
    }


}