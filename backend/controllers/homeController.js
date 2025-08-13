exports.travelerHome = (req, res) => {
  res.json({ message: 'Welcome to the Traveler Home Page!', user: req.user });
};

exports.adminHome = (req, res) => {
  res.json({ message: 'Welcome to the Admin Home Page!', user: req.user });
}; 