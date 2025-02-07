const { BadRequest } = require("http-errors");

const validation = (schema, errorMessage) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest(errorMessage);
    }
    next();
  };
};

module.exports = validation;
