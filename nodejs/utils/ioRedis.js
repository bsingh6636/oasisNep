import Redis from 'ioredis';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

const RedisUtils = {
  set: async (key, value) => await redisClient.set(key, value),

  get: async (key) => await redisClient.get(key),

  delete: async (key) => await redisClient.del(key),

  flushAll: async () => await redisClient.flushall(),
};

export default RedisUtils;
