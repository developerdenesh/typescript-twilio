// Import the library used to import the .env file
import dotenv from 'dotenv';

// Import the .env file
dotenv.config();

// Define the environment variables
export const port = process.env.PORT || 3000;
export const environment: string = process.env.ENVIRONMENT || ''
export const accountSid: string = process.env.ACCOUNT_SID || ''
export const authToken: string = process.env.AUTH_TOKEN || ''
export const robot_name = process.env.ROBOT_NAME || '';
export const sms_id = process.env.SMS_ID || ''
export const phone_numbers_debug: string = process.env.DEBUG_NUMBERS || ''
export const phone_numbers_production: string = process.env.PRODUCTION_NUMBERS || ''