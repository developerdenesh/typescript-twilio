import express, { Express, Request, Response } from 'express';
import { Twilio } from "twilio";
import { sendMessage } from './helper'
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
} from './variables'

import loginrouter from './routes/login'
import homerouter from './routes/homer'
import customrouter from './routes/custom'
import adminrouter from './routes/administer'
import adminupdatedrouter from './routes/adminupdaterouter'

import cleaningcompletedapi from './api/cleaningcompleted'
import cleaningcompleteddebugapi from './api/cleaningcompleteddebug'
import cleaningstartedapi from './api/cleaningstartedapi'
import bumberengagedapi from './api/bumperengagedapi'
import cleaningstarteddebugapi from './api/cleaningstarteddebugapi'
import bumperengageddebugapi from './api/bumperengageddebugapi'
import sendcustommessageapi from './api/sendcustommessage'
import admindetailapi from './api/admindetail'

// Using the express backend library
const app: Express = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// This is required to make forms work
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Constant variables to be used in the endpoints later
const client = new Twilio(accountSid, authToken);
const phone_numbers_debug_arr: Array<string> = phone_numbers_debug.split(" ") || []
const phone_numbers_production_arr: Array<string> = phone_numbers_production.split(" ") || []

// ====================
// These are the views
// ====================
app.get('/', loginrouter);
app.post('/home', homerouter);
app.get('/custom', customrouter);
app.get('/admin', adminrouter);
app.get('/admin_updated', adminupdatedrouter);


// ====================
// These are the API endpoints
// ====================
app.get('/cleaning_completed', cleaningcompletedapi);
app.get('/cleaning_completed_debug', cleaningcompleteddebugapi);
app.get('/cleaning_starting', cleaningstartedapi);
app.get('/cleaning_starting_debug', cleaningstarteddebugapi);
app.get('/bumper_engaged', bumberengagedapi);
app.get('/bumper_engaged_debug', bumperengageddebugapi);
app.post('/send_custom_message', sendcustommessageapi);
app.post('/admin_detail', admindetailapi);

// This is the listening for the localhost
app.listen(port, () => {
    // NO SSL at the moment
    console.log(`⚡️⚡️⚡️ Server is running at http://localhost:${port}`);
});