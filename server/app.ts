import '@babel/polyfill/noConflict';
import serverless from 'serverless-http';
import server from './utils/server';

exports.handler = serverless(server.getApp());
