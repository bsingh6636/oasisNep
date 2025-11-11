import { createClient } from 'redis';

let redis;

const VERCEL_REDIS_URL = process.env.VERCE_REDIS_URL;

const initializeRedisClient = async () => {
  try {
    redis = createClient({
      url: VERCEL_REDIS_URL,
      socket: {
        // 1. CRITICAL: Prevents firewalls/proxies from dropping idle connections
        keepAlive: 10000, // Send a TCP keep-alive probe every 10 seconds
      },
    });

    // 2. CRITICAL: Prevents process crash (Unhandled 'error' event)
    redis.on('error', (err) => {
      console.error('❌ Redis Client Error (Unhandled):', err.code, err.message);
      // The client library handles the reconnection logic internally.
      // Do not attempt to call redis.connect() or process.exit() here.
    });

    await redis.connect();
    console.log('✅ Redis connected successfully');
  } catch (err) {
    console.error('❌ Initial Redis connection error:', err);
    // In a production app, you might want to exit or retry here if initial connection fails
  }
};

initializeRedisClient();

const setRedis = async (key, value, expire) => {
  try {
    if (!redis?.isOpen) {
      console.warn('⚠️ Redis is not connected. Attempting reconnect...');
      await redis.connect();
    }
    console.log(`📝 Setting key: ${key}, value: ${value}, expire: ${expire}s`);
    const stringifyValue = typeof value === 'object' ? JSON.stringify(value) : value;
    const data = await redis.set(key, stringifyValue, { EX: expire });
    console.log(`✅ Key set result: ${data}`);
    return data;
  } catch (error) {
    console.error('❌ Error in setRedis:', error);
    return null;
  }
};

const getRedis = async (key) => {
  try {
    if (!redis?.isOpen) {
      console.warn('⚠️ Redis is not connected. Attempting reconnect...');
      await redis.connect();
    }
    console.log(`🔍 Getting key: ${key}`);
    const data = await redis.get(key);
    console.log(`✅ Retrieved value for ${key}:`, data);
    const parsedValue = typeof data === 'string' ? JSON.parse(data) : data;
    return parsedValue;
  } catch (error) {
    console.error('❌ Error in getRedis:', error);
    return null;
  }
};

export { setRedis, getRedis };
