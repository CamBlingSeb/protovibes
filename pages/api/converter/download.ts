import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'server/lib/session';
import { downloadAudio } from 'server/handlers/converter/downloadAudio';

export default withIronSessionApiRoute(DownloadAudioRoute, sessionOptions);

async function DownloadAudioRoute(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return await downloadAudio(req, res);
}