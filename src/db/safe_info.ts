import { execute, query } from "./query";

export async function getNotApplyList(): Promise<Array<any>> {
    return await query("select * from safe_info where submit_time < CURRENT_DATE");
}

export async function safeApply(qq: number) {
    return await execute(`update safe_info set submit_time = CURRENT_DATE where user_id = '${qq}'`);
}