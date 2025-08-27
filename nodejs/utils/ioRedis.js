import Redis from 'ioredis';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

const RedisUtils = {
  set: async (key, value) => {
    return await redisClient.set(key, value);
  },

  get: async (key) => {
    return await redisClient.get(key);
  },

  delete: async (key) => {
    return await redisClient.del(key);
  },

  flushAll: async () => {
    return await redisClient.flushall();
  }
};

export default RedisUtils;
