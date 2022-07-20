import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions, CurrentUser } from "server/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyUser } from "server/handlers/auth/verifyUser";

export default withIronSessionApiRoute(UserRoute, sessionOptions);

async function UserRoute(req: NextApiRequest, res: NextApiResponse<CurrentUser>) {
    return await verifyUser(req, res);
}