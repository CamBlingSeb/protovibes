import mysql from 'serverless-mysql';
import { Connection, OkPacket, MysqlError } from 'mysql';
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

// interface globalMySql {
//     conn: any;

// }


const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: +process.env.MYSQL_PORT!,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    },
    onConnect: (conn: Connection) => { console.log('DB Connection Established: ', conn.threadId) },
    onConnectError: (e: MysqlError) => { console.log('DB Connection Error: ', e.code) }
});

export default async function executeQuery({ query, values }: { query: string, values: any }): Promise<OkPacket | any> {
    try {
        const results: OkPacket = await db.query(query, values);
        await db.end();

        return results;
    } catch (err) {
        return { err };
    }
}

