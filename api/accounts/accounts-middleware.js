// Imports
const Accounts = require('./accounts-model');
const db = require('../../data/db-config');
// const yup = require('yup');

// Middleware

// const accountSchema = yup.object({
//   name: yup
//     .string()
//     .trim()
//     .min(3, 'name of account must be between 3 and 100')
//     .max(100, 'name of account must be between 3 and 100')
//     .required('name and budget are required'),
//   budget: yup
//     .number('budget of account must be a number')
//     .positive('budget of account is too large or too small')
//     .integer(1000000, 'budget of account is too large or too small')
//     .required('name and budget are required')
// });

const checkAccountPayload = (req, res, next) => {
  // try {
  //   const validatedAccount = await accountSchema.validate(req.body);
  //   req.body = validatedAccount;
  //   next()
  // } catch(err) {
  //   next(err);
  // };
  
  const name = req.body.name;
  console.log(name);
  const budget = req.body.budget;
  console.log(budget);

  if (name === undefined || budget === undefined) {
    next({status: 400, message: 'name and budget are required'});
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({status: 400, message: 'name of account must be between 3 and 100'});
  } else if (typeof budget != 'number' || isNaN(budget) === true) {
    next({status: 400, message: 'budget of account must be a number'});
  } else if (budget > 1000000 || budget < 0) {
    next({status: 400, message: 'budget of account is too large or too small'});
  } else {
    req.body.name = name.trim();
    req.body.budget = budget;
    next();
  };
};

const checkAccountNameUnique = async (req, res, next) => {
  try {
    const matchingNames = await db('accounts').where('name', req.body.name).first();
    if (matchingNames) {
    next({status: 400, message: 'that name is taken'});
    } else {
      next();
    }
  } catch(err) {
    next(err);
  }  
};

const checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
    .then(account => {
      if(!account) {
        next({status: 404, message: 'account not found'});
      } else {
        next();
      };
    })
    .catch(next);
};

// Exports
module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
};