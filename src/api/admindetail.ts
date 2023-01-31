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


const client = new Twilio(accountSid, authToken);
const phone_numbers_debug_arr: Array<string> = phone_numbers_debug.split(" ") || []
const phone_numbers_production_arr: Array<string> = phone_numbers_production.split(" ") || []

const admindetailapi = (req: Request, res: Response) => {
    console.log("inside the custom sms endpoint")
    console.log(`${req.body.debug_numbers}`)
    console.log(`${req.body.production_numbers}`)

    const url = require('url')
    res.redirect(308, url.format({
        pathname: "/admin_updated",
    }))
    res.status(401).end()

    return;

    const date: Date = new Date();
    const singapore_date = date.toLocaleString("en-GB", { timeZone: 'Asia/Singapore' })
    const body: string = `${singapore_date}: ${req.body.message}`;

    // This method only sends to the debug numbers
    phone_numbers_debug_arr.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    res.send('Custom message: ' + body);
}

export default admindetailapi
