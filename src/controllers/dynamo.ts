import AWS from 'aws-sdk'

export const debug_nums: Array<string> = [];
export const production_nums: Array<string> = [];

let debug_nums_modifier = debug_nums
let production_nums_modifier = production_nums

const obtainNumbers = async () => {
    // Set the region 
    AWS.config.update({ region: 'ap-southeast-1' });

    // Create the DynamoDB service object
    var ddb = new AWS.DynamoDB()

    // Call DynamoDB to read the item from the table
    ddb.scan({
        TableName: 'debugnumbers',
    }, (err, data) => {
        if (err) {
            console.log("Error!!!:", err);
        } else {
            if (data.Items && data.Items.length === 1) {
                // In case the data is undefined
                const debug_nums_string: string = (data.Items[0].numbers.S) ? (data.Items[0].numbers.S) : ("")
                debug_nums_string.split(" ").map(element => {
                    debug_nums_modifier.push(element)
                })
            }
        }
    });

    // Call DynamoDB to read the item from the table
    ddb.scan({
        TableName: 'phonenumbers',
    }, (err, data) => {
        if (err) {
            console.log("Error!!!:", err);
        } else {
            if (data.Items && data.Items.length === 1) {
                // In case the data is undefined
                const production_nums_string: string = (data.Items[0].numbers.S) ? (data.Items[0].numbers.S) : ("")
                production_nums_string.split(" ").map(element => {
                    production_nums_modifier.push(element)
                })
            }
        }
    });
}

export default obtainNumbers