const siteURL = process.env.NODE_ENV === 'production' ? 'http://vcm-3422.vm.duke.edu' : 'http://localhost';
const postFix = process.env.NODE_ENV === 'production' ? '/api' : ':1717';

module.exports = {
  baseURL: `${siteURL}${postFix}`,
};
