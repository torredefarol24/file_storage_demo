const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');

router.get('/', (request, response) => {
  const context = {
    success: true,
    message: 'Health OK!',
    data: null,
  };
  return response.status(StatusCodes.OK).json(context);
});

module.exports = router;
