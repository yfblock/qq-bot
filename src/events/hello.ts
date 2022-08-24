import { bot } from "../global";
import { segment } from "oicq";

// hello world
// bot.on("message", function (msg) {
// 	if (msg.raw_message === "hello")
// 		msg.reply("hello world", true) //改为false则不会引用
// })

// const server_group_id = 514421542;
const server_group_id = 694048770;

let questions: string[][] = [
	['是否可以带电脑', "大一不可以"],
	['开学是否封校', '开学封闭式管理，非必要不能进出']
]

function in_question(question: string): number {
	for(let i = 0; i < questions.length; i++) {
		if (questions[i][0] == question) {
			return i;
		}
	}
	return -1;
}

// 撤回和发送群消息
bot.on("message.group", function (msg) {
	if (msg.group_id == server_group_id) {
		if (msg.raw_message === "查询问题") {
			let question_list = questions.map(x => x[0]).join("\n");
			msg.reply("可询问问题如下: \n" + question_list, true);
		} else if (msg.raw_message === "通知没有报平安的" && (msg.sender.role == "admin" || msg.sender.role == "owner")) {
			msg.group.sendMsg(segment.at(321353225))
			// msg.reply("测试通知");
		} else if (msg.raw_message.startsWith("添加问题") && (msg.sender.role == "admin" || msg.sender.role == "owner")) {
			console.log(msg);
			let split_char = '\n';
			let message = msg.raw_message.substring(4);
			console.log(message.charCodeAt(0));
			if (message.charAt(0) == '\r') {
				split_char = '\r'
			} else if(message.charAt(0) == split_char) {

			} else {
				return;
			}
			message = message.substring(1);

			let question_split_index = message.indexOf(split_char);
			let question = message.substring(0, question_split_index);
			let answer = message.substring(question_split_index + 1);
			questions.push([question, answer]);
			if (question.trim().length > 0) {
				msg.reply(`添加成功 问题: ${question}  答案: ${answer}`, true);
			} else {
				msg.reply(`问题格式异常`, true);
			}
		} else {
			let question_index = in_question(msg.raw_message);
			if (question_index != -1) {
				msg.group.sendMsg(questions[question_index][1]);
			}
		}
	} else if(msg.group_id == 514421542) {
        if(msg.sender.role == "owner" && msg.raw_message == "深夜小作文") {
            msg.group.sendMsg("我们不太可能像伟人那样,深夜一想就能净化自己的灵魂,甚至想出什么治国方针,但是我们可以通过回想知道自己尚还存在哪些不足,让明天过得比今天更好。");
        }
    }
	// if ( && msg.raw_message === "机器人") {
	// 	msg.group.sendMsg("收到 测试成功!");
	// 	// msg.reply("收到");
	// 	msg.member.poke()
	// }
})

// 接收戳一戳
bot.on("notice.group.poke", function (e) {
	if (e.target_id === this.uin)
		e.group.sendMsg("请温柔一点戳哦")
})
