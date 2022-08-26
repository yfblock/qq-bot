import { DiscussMessageEvent, GroupMessageEvent, PrivateMessageEvent } from "oicq";

export function isAdmin(msg: GroupMessageEvent): boolean {
    return msg.sender.role == "owner" || msg.sender.role == "admin";
}

export function isPowerfulMan(msg: PrivateMessageEvent | GroupMessageEvent | DiscussMessageEvent): boolean {
    return msg.sender.user_id == 321353225 || msg.sender.user_id == 173547782;
}

export async function asyncWait(time: number): Promise<void> {
    return new Promise((resolved, rejected) =>setTimeout(() => resolved(), time));
}