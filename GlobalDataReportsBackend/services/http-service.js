const request = require('request');
const URL = require('url');

const getOptions = (options) => {
  let url = options.url.replace(/ /g, '%20');
  url = URL.parse(url);
  return {
    url,
    method: options.method || 'GET',
    headers: {
      Host: url.host,
      Accept: 'application/json',
      'User-Agent': 'request',
    }
  };
}; 
const callEndPoint = (optionsObject, bodyStatus) => {
  return new Promise((resolve, reject) => {
    request(optionsObject, (error, response, body) => {
      if (error) {
        reject(error);
      }

      if (response && response.statusCode === 200) {
        if (bodyStatus) {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(JSON.parse(response.body));
        }
      } else {
        reject(response);
      }
    });
  });
} 
 
module.exports.callEndPoint=callEndPoint;