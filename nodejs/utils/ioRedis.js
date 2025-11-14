import Redis from 'ioredis';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

const RedisUtils = {
  set: async (key, value) => redisClient.set(key, value),

  get: async (key) => redisClient.get(key),

  delete: async (key) => redisClient.del(key),

  flushAll: async () => redisClient.flushall(),
};

export default RedisUtils;
