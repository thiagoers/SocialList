const joi = require('@hapi/joi');
const { getValidatorError } = require('../helpers/validator');

const accountSignUp = (req,res,next) => {
  const { email, password, password_confirmation } = req.body;
  
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    password_confirmation: joi.string().valid(joi.ref('password')).required(),
  });

  const options = {abortEarly:  false}
  const { error } = schema.validate({ email, password, password_confirmation }, options);
  if(error) {
    const messages = getValidatorError(error, 'account.signup');
    return res.jsonBadRequest(null, null, {error: messages});
  }

  next();
};

module.exports = { accountSignUp };