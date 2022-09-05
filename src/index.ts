import { createClient } from "oicq"
import  "./events"
import { bot } from "./global"

process.on("unhandledRejection", (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})

if(process.env.qq_password) {
	bot.on("system.login.slider", function(e) {
		console.log("请输入ticket:");
		process.stdin.once("data", ticket => this.submitSlider(String(ticket).trim()))
	}).login(process.env.qq_password)
} else {
	bot.on("system.login.qrcode", function (_e) {
		this.logger.mark("扫码后按Enter完成登录")
		process.stdin.once("data", () => {
			this.login()
		})
	}).login()
}
