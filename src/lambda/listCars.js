const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = 'car';
exports.handler = async () => {
    const params = {
        TableName: tableName
    };
    try {
        const data = await docClient.send(new ScanCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching cars', error })
        };
    }
}; 