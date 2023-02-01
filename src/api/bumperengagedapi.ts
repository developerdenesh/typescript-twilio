import { Request, Response } from 'express';
import { sendMessage } from '../helper'
import {
    accountSid,
    authToken,
    environment,
    password,
    phone_numbers_debug,
    phone_numbers_production,
    port,
    robot_name,
    username,
    sms_id,
} from '../variables'
import { Twilio } from "twilio";
import {
    debug_nums,
    production_nums
} from '../controllers/dynamo'


const client = new Twilio(accountSid, authToken);
// const phone_numbers_debug_arr: Array<string> = phone_numbers_debug.split(" ") || []
// const phone_numbers_production_arr: Array<string> = phone_numbers_production.split(" ") || []

const bumberengagedapi = (req: Request, res: Response) => {
    console.log("inside the bumper engaged endpoint")
    const date: Date = new Date();
    const singapore_date = date.toLocaleString("en-GB", { timeZone: 'Asia/Singapore' })
    const body: string = `${robot_name}: Robot has been stopped at ${singapore_date}. Please release the emergency stop`;

    debug_nums.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    if (environment === "PRODUCTION") {
        production_nums.map(out_number => {
            sendMessage({ client, body, out_number, sms_id })
        })
    }

    res.send('Sending bumper engaged request ' + body);
}

export default bumberengagedapi
