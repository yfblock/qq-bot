import { Connection, createConnection } from "mysql";
import { promisify } from 'util';

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
})

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

// export const query = (connection: Connection, sql: string, args: any) => {
//     return promisify(connection.query)
//       .call(connection, sql, args);
// };

const query = function(sql: string) {
	return new Promise((resolved, rejected)=>{
        connection.query(sql, function(error, results, fields) {
            if (results === null) {
				rejected(null);
			} else {
				resolved(results);
			}
        })
	});
}