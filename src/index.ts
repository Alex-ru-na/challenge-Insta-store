import dotenv from 'dotenv-flow';
if (process.env.NODE_ENV === 'local') {
  dotenv.config({ silent: true });
}

import Server from './modules/main/app/server';
import serverlessExpress from '@vendia/serverless-express';

let serverlessExpressInstance: any;

async function setup(event: any, context: any) {
  try {
    const server = Server.getInstance();
    await server.init();
    const app = server.getApp();
    serverlessExpressInstance = serverlessExpress({ app });
    return serverlessExpressInstance(event, context);
  } catch (error) {
    console.error('error', error)
  }
}

export function handler(event: any, context: any) {
  if (serverlessExpressInstance) {
    return serverlessExpressInstance(event, context);
  }
  return setup(event, context);
}

export default handler;
