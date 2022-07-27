import executeQuery from "server/lib/connectors/mysqlConnect";
import {
    User
} from '../schemas';
import {
    NotAuthorizedError
} from '../errors'

export class Database {
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
}