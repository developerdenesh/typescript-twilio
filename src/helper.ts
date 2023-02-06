import { Twilio } from "twilio"
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message"

export const sendMessage = ({ client, body, out_number, sms_id }: {client: Twilio, body: string, out_number: string, sms_id: string}) => {
    client.messages
        .create({
            body: body,
            to: `${out_number}`,
            messagingServiceSid: `${sms_id}`
        })
        .then((message: MessageInstance) => {
            console.log("sent the message: " + message.body + " from: " + message.sid)
        })
}

export const getSingaporeDate = (): string => {
    const date: Date = new Date();
    return date.toLocaleString("en-GB", { timeZone: 'Asia/Singapore' })
}
