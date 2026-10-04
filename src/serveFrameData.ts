import fs from 'fs';

const frameData = fs.readFileSync('frameData', 'utf-8');

const server = Bun.serve({
  routes: {
    "/": new Response(frameData),
  },
});

console.log(`Server running at ${server.url}`);