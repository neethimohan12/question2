import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class Exam1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

//  DynamoDB
    const table = new dynamodb.Table(this, "Table1", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    // Lambda Function
    const myLambda = new lambda.Function(this, "Lambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log("Event:", event);
          return {
            statusCode: 200,
            body: "Hello! Lambda + API Gateway + DynamoDB Table are created successfully."
          };
        };
      `),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // Give Lambda permission to access DynamoDB
    table.grantReadWriteData(myLambda);

    // API Gateway to trigger Lambda
    new apigateway.LambdaRestApi(this, "SimpleApi", {
      handler: myLambda,
    });
  
  
  }
}
