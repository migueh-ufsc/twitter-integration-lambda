import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import {
  httpErrorToLambdaResponse,
  httpResponseToLambdaResponse,
  parseStringToJson,
} from 'common/Utils';
import { CreateUser, GetUser } from './factory';

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { path, body, httpMethod, queryStringParameters } = event;

  console.log('Received event:', JSON.stringify(event, null, 2));
  console.info(`[${new Date().toISOString()}] ${httpMethod} ${path}`);

  try {
    if (httpMethod === 'POST') {
      const parsedBody = parseStringToJson(body);
      const result = await CreateUser.handle({ body: parsedBody });
      return httpResponseToLambdaResponse(result);
    } else if (
      httpMethod === 'GET' &&
      (queryStringParameters?.id || queryStringParameters?.username)
    ) {
      const parsedBody = parseStringToJson(body);
      const result = await GetUser.handle({ body: parsedBody });
      return httpResponseToLambdaResponse(result);
    }
  } catch (error) {
    console.error('Error:', error);
    return httpErrorToLambdaResponse(error);
  }
};
