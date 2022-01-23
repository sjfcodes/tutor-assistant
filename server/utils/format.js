const formatName = (name) => (name ? `${name[0].toUpperCase()}${name.substring(1)}` : null);

module.exports = {
  formatName,
};
