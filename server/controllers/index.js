const get_index = async (req, res) => {
  res.status(200).json({ msg: 'Welcome to the v1 api.' });
};

module.exports.get_index = get_index;
