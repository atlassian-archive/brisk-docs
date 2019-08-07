module.exports = path => {
  if (path.includes('index.js')) {
    return path.replace('/index.js', '');
  }
  return path.replace('.js', '');
};
