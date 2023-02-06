import { Request, Response } from 'express';
import { sendMessage, getSingaporeDate } from '../helper'
import { accountSid, authToken, robot_name, sms_id } from '../variables'
import { Twilio } from "twilio";
import { debug_nums } from '../controllers/dynamo'

const client = new Twilio(accountSid, authToken);

const bumperengageddebugapi = (req: Request, res: Response) => {
    const singapore_date: string = getSingaporeDate()
    
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
