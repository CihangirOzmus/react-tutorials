import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization:
      'Client-ID d03d4930f8f2d5732fc9fed402658f9e866b6bacd55e95abc3399172a6c8bccc',
  },
});
