import { bot } from "../global";
import { segment } from "oicq";
import { query } from "../db/query"
import { addQuestion, deleteQuestion, findQuestion, getQuestions, updateQuestion } from "../db/question";
import { listNotApply, personApply, tipNotApply } from "../functions/tell_safe";

// const server_group_id = 514421542;
const server_group_id = [514421542];

function isServerGroup(id: number): boolean {
	for(let i = 0;i < server_group_id.length;i++) {
		if(server_group_id[i] == id) {
			return true;
		}
	}
	return false;
}

// 撤回和发送群消息
bot.on("message.group", async function (msg) {
	if (isServerGroup(msg.group_id)) {
		if (msg.raw_message == "谁没有报平安") {
			listNotApply(msg);
		} else if (msg.raw_message == "提醒报平安") {
			tipNotApply(msg);
		} else if (msg.raw_message == "已报") {
			personApply(msg);
		}
	}
})

// 接收戳一戳
// bot.on("notice.group.poke", function (e) {
// 	if (e.target_id === this.uin)
// 		e.group.sendMsg("请温柔一点戳哦")
// })
