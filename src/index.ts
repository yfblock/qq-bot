import { createClient } from "oicq"
import  "./events"
import { bot } from "./global"

bot.on("system.login.qrcode", function (_e) {
	this.logger.mark("扫码后按Enter完成登录")
	process.stdin.once("data", () => {
		this.login()
	})
})

process.on("unhandledRejection", (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})


bot.login()