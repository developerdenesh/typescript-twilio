import { Request, Response } from 'express';
import { sendMessage, getSingaporeDate } from '../helper'
import { accountSid, authToken, sms_id } from '../variables'
import { Twilio } from "twilio";
import { debug_nums } from '../controllers/dynamo'

const client = new Twilio(accountSid, authToken);

const cleaningcompleteddebugapi = (req: Request, res: Response) => {
    console.log("inside the custom sms endpoint")
    const singapore_date: string = getSingaporeDate()
    const body: string = `${singapore_date}: ${req.body.message}`;

    // This method only sends to the debug numbers
    debug_nums.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    res.send('Custom message: ' + body);

}

export default cleaningcompleteddebugapi
