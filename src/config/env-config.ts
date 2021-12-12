import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      port: process.env.PORT,
    },
    broker: {
      url: process.env.AMQP_URL,
      queue: process.env.AMQP_QUEUE,
      name: process.env.AMQP_NAME,
    },
    apiKey: process.env.API_KEY,
  };
});
