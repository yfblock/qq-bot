import { Client, createClient } from "oicq";
import { exit } from "process";
import config from "../config"

if(!config.account) {
    console.log("请提供qq账号");
    exit(0);
}

export let bot = createClient(parseInt(config.account));
