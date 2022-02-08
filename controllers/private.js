module.exports = (req, res) => {
  res.status(201).json({
    token: "Verified",
    Destination: "Private data route accessed",
  });
};
