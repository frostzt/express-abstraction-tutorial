import express from 'express';
import dotenv from 'dotenv';
import ExpressApplication from './bootstrapper';
import logger from './lib/logger';
import 'reflect-metadata';
import UserController from './api/user/user.controller';

// Load the envs based on current NODE_ENV
dotenv.config({ path: `${process.cwd()}/.env` });

const PORT = process.env.PORT || 5000;

const app = new ExpressApplication(
  PORT,
  [
    express.json({ limit: '10kb' }),
    express.urlencoded({ extended: true, limit: '10kb' }),
  ],
  [UserController],
);

const server = app.start();

// Handle SIGTERM
process.on('SIGTERM', () => {
  logger.warn('SIGTERM RECIEVED!');
  server.close(() => {
    logger.warn('Process terminated!');
  });
});
