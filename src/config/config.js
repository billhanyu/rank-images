const siteURL = process.env.NODE_ENV === 'production' ? 'http://norm.guide' : 'http://localhost';
const postFix = process.env.NODE_ENV === 'production' ? '/api' : ':1717';

module.exports = {
  baseURL: `${siteURL}${postFix}`,
};
