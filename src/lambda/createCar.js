const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = 'car';

exports.handler = async (event) => {
    const { id, make, model, plateNumber } = JSON.parse(event.body);
    const params = {
        TableName: tableName,
        Item: { id, make, model, plateNumber }
    };
    try {
        await docClient.send(new PutCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Car created successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating car', error })
        };
    }
}; 