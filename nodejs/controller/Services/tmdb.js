import axios from 'axios';
import { getRedis, setRedis } from '../../utils/vercelRedis.js';

const { TMDB_API_KEY } = process.env;

export const getwhatToWatchFromTMDB = async (req, res) => {
  try {
    const data = await getRedis('tmdbList');
    if (data) return data;
    return await setTMDBToRedis();
  } catch (error) {
    // logger.error(error)
    console.log(error);
  }
};

const setTMDBToRedis = async () => {
  try {
    const data = await getTMDDList();
    await setRedis('tmdbList', data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getTMDDList = async () => {
  try {
    const data = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}`);
    console.log(data.data);
    return data.data;
  } catch (error) {
    // logger.error(error)
    console.log(error);
  }
};
