#! /usr/bin/env tsx
import fastify from 'fastify';
import { recommendations } from 'mock-data';

const app = fastify();

app.get('/recommendations', async () => ({recommendations}));

const port = parseInt(process.argv[2] || '4000', 10);
app.listen({port}, (err, address) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Mock server running at ${address}`);
});
