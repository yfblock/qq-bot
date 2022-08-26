import { bot } from "../global";
import { segment } from "oicq";
import { query } from "../db/query"
import { addQuestion, deleteQuestion, findQuestion, getQuestions, updateQuestion } from "../db/question";
import { listNotApply, personApply, tipNotApply } from "../functions/tell_safe";

bot.on("message", function (msg) {
	if (msg.raw_message == "已报") {
		personApply(msg);
	}
})

// const server_group_id = 514421542;
const server_group_id = [694048770, 514421542, 613541850];

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
		if (msg.raw_message === "查询问题") {
			let q = await getQuestions();
			// let question_list = questions.map(x => x[0]).join("\n");
			let question_list = q.map(x => x.question).join("\n");
			msg.reply("可询问问题如下: \n" + question_list, true);
		} else if (msg.raw_message === "通知没有报平安的" && (msg.sender.role == "admin" || msg.sender.role == "owner")) {
			msg.group.sendMsg(segment.at(321353225))
			// msg.reply("测试通知");
		} else if (msg.raw_message.startsWith("添加问题") && (msg.sender.role == "admin" || msg.sender.role == "owner")) {
			let split_char = '\n';
			let message = msg.raw_message.substring(4);
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
			
			let searchedQuestion = await findQuestion(question);
			if (searchedQuestion.length > 0) {
				msg.reply(`问题已经存在`, true);
				return;
			} else {
				if (question.trim().length > 0) {
					await addQuestion(question, answer, msg.sender.user_id.toString());
					msg.reply(`添加成功 问题: ${question}  答案: ${answer}`, true);
				} else {
					msg.reply(`问题格式异常`, true);
				}
			}
		} else if (msg.raw_message.startsWith("删除问题") && (msg.sender.role == "admin" || msg.sender.role == "owner")) {
			let split_char = '\n';
			let message = msg.raw_message.substring(4);
			if (message.charAt(0) == '\r') {
				split_char = '\r'
			} else if(message.charAt(0) == split_char) {

			} else {
				return;
			}
			let question = message.substring(1);
			let searchedQuestion = await findQuestion(question);
			if (searchedQuestion.length == 0) {
				msg.reply(`问题不存在`, true);
				return;
			} else {
				if (question.trim().length > 0) {
					await deleteQuestion(question);
					msg.reply(`删除成功 问题: ${question}`, true);
				} else {
					msg.reply(`问题格式异常`, true);
				}
			}
		} else if (msg.raw_message.startsWith("修改问题") && (msg.sender.role == "admin" || msg.sender.role == "owner")) {
			let split_char = '\n';
			let message = msg.raw_message.substring(4);
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

			let searchedQuestion = await findQuestion(question);
			if (searchedQuestion.length == 0) {
				msg.reply(`问题不存在`, true);
				return;
			} else {
				if (question.trim().length > 0) {
					await updateQuestion(question, answer);
					msg.reply(`修改成功 问题: ${question}  答案: ${answer}`, true);
				} else {
					msg.reply(`问题格式异常`, true);
				}
			}
		} else if (msg.raw_message == "谁没有报平安") {
			listNotApply(msg);
		} else if (msg.raw_message == "提醒报平安") {
			tipNotApply(msg);
		} else {
			let searchedQuestion = await findQuestion(msg.raw_message);
			if (searchedQuestion.length <= 0) {
				
			} else {
				msg.reply(`${searchedQuestion[0].answer}`, true);
			}
			
		}
	} else if(msg.group_id == 514421542) {
        
    }
})

// 接收戳一戳
bot.on("notice.group.poke", function (e) {
	if (e.target_id === this.uin)
		e.group.sendMsg("请温柔一点戳哦")
})
