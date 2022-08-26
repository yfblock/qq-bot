import { getNotApplyList, safeApply } from "../db/safe_info";
import { DiscussMessageEvent, GroupMessageEvent, PrivateMessageEvent, segment } from "oicq";
import { asyncWait, isAdmin } from '../utils';
import { RecurrenceRule, scheduleJob } from 'node-schedule';
import { bot } from "../global";
import { setTimeout } from "timers/promises";

const serve_group = 514421542;

export async function personApply(msg: PrivateMessageEvent | GroupMessageEvent | DiscussMessageEvent) {
    await safeApply(msg.sender.user_id);
    msg.reply("成功上报", true);
}

export async function listNotApply(msg: GroupMessageEvent) {
    if((msg.message_type == "group" && msg.group_id == serve_group && isAdmin(msg))) {
        let list = await getNotApplyList();
        let nameList = list.map(x => x.name);
        if (nameList.length > 0) {
            msg.reply(nameList.join("\n"), true);
        } else {
            msg.reply("已经全部报平安了\n干的漂亮", true);
        }
    }
}

export async function tipNotApply(msg: GroupMessageEvent) {
    if((msg.message_type == "group" && msg.group_id == serve_group && isAdmin(msg))) {
        let list = await getNotApplyList();
        let nameList = list.map(x => segment.at(x.user_id));
        if (nameList.length > 0) {
            msg.reply([
                "以下同学没有报平安\n请私聊我回复已报\n",
                ...nameList
            ], true);
        } else {
            msg.reply("已经全部报平安了\n干的漂亮", true);
        }
    }
}

let rule = new RecurrenceRule();
rule.hour = [0, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
rule.minute = 1;
let job = scheduleJob(rule, async () => {
    let list = await getNotApplyList();
    for(let i = 0; i < list.length; i++) {
        let qq = await setTimeout(10000, list[i].user_id);
        bot.sendTempMsg(serve_group, qq, "请在我i科大完成今天的报平安");
        qq = await setTimeout(1000, list[i].user_id);
        bot.sendTempMsg(serve_group, qq, "如已完成请回复已报");
        qq = await setTimeout(1000, list[i].user_id);
        bot.sendTempMsg(serve_group, qq, `祝 ${list[i].name} 生活愉快`);
    }
});