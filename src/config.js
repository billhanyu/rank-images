const baseURL = process.env.NODE_ENV === 'production'
  ?
  'bluh'
  :
  'http://localhost:1717';

module.exports = {
  baseURL,
};
