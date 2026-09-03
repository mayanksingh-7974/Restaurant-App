export const testUserController = (req, res) => {
  res.status(200).send({
    success: true,
    message: "Test User Data API",
  });
};