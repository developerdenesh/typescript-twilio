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

const bumperengageddebugapi = (req: Request, res: Response) => {
    const date: Date = new Date();
    const singapore_date = date.toLocaleString("en-GB", { timeZone: 'Asia/Singapore' })
    
    let base_triggered: any = (req.query.base_triggered === undefined) ? ("undefined") : (req.query.base_triggered);
    let module_triggered: any = (req.query.module_triggered === undefined) ? ("undefined") : (req.query.module_triggered);
    
    const body: string = `${robot_name}: Robot has been stopped at ${singapore_date}. Please release the emergency stop. Base E-stop: ${base_triggered}; Module E-stop: ${module_triggered}; (this is a test message)`;

    // This method only sends to the debug numbers
    debug_nums.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    res.send('Sending bumper engaged request ' + body);
}

export default bumperengageddebugapi
