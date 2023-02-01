import { Request, Response } from 'express';
import { sendMessage } from '../helper'
import {
    accountSid,
    authToken,
    environment,
    password,
    port,
    robot_name,
    username,
    sms_id,
} from '../variables'
import { Twilio } from "twilio";
import {
    debug_nums,
} from '../controllers/dynamo'


const client = new Twilio(accountSid, authToken);
// const phone_numbers_debug_arr: Array<string> = phone_numbers_debug.split(" ") || []
// const phone_numbers_production_arr: Array<string> = phone_numbers_production.split(" ") || []

const cleaningcompleteddebugapi = (req: Request, res: Response) => {
    console.log("inside the custom sms endpoint")
    const date: Date = new Date();
    const singapore_date = date.toLocaleString("en-GB", { timeZone: 'Asia/Singapore' })
    const body: string = `${singapore_date}: ${req.body.message}`;

    // This method only sends to the debug numbers
    debug_nums.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    res.send('Custom message: ' + body);

}

export default cleaningcompleteddebugapi
