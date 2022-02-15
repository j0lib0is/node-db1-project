// Imports
const router = require('express').Router()
const Accounts = require('./accounts-model');
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');

// Endpoints
router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.json(accounts);
    })
    .catch(next);
});

router.get('/:id', checkAccountId, (req, res, next) => {
  Accounts.getById(req.params.id)
    .then(account => {
      res.json(account);
    })
    .catch(next);
});

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
    .then(newAccount => {
      res.status(201).json(newAccount);
    })
    .catch(next);
});

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then(updatedAccount => {
      res.json(updatedAccount);
    })
    .catch(next);
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(deletedCount => {
      res.json(deletedCount);
    })
    .catch(next);
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customError: 'Hm. Something is wrong here.',
    message: err.message,
    stack: err.stack
  });
});

// Export
module.exports = router;
