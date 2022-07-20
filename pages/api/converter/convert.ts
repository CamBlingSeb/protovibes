import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'server/lib/session';
import { convertVideoToAudio } from 'server/handlers/converter/convertVideoToAudio';

export default withIronSessionApiRoute(ConvertVideoToAudioRoute, sessionOptions);

async function ConvertVideoToAudioRoute(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return await convertVideoToAudio(req, res);
}