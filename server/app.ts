import '@babel/polyfill/noConflict';
import serverless from 'serverless-http';
import server from './utils/server';

export const handler = serverless(server.getApp());
