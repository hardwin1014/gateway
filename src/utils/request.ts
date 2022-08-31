import axios from 'axios';

/**
 * @description: 任意请求
 */
const request = async ({ url, option = {} }) => {
  try {
    return axios.request({
      url,
      ...option,
    });
  } catch (error) {
    throw error;
  }
};

export { request };
