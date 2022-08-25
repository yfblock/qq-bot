import { connection } from "./conn";

export const query = function (sql: string): Promise<Array<any>> {
    return new Promise((resolved, rejected) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                rejected(error);
            } else {
                resolved(results);
            }
        })
    });
}

export const execute = function (sql: string) {
    return new Promise((resolved, rejected) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                rejected(error);
            } else {
                resolved(results);
            }
        })
    });
}
