import { Client, createClient } from "oicq";
import config from "../config"

export let bot = createClient(config.account);
