// Imports
const db = require('../../data/db-config');

// Models
const getAll = () => {
  return db('accounts');
}

const getById = async id => {
  const matchedAccounts = await db('accounts').where('id', id).first();
  return matchedAccounts;
}

const create = async (account) => {
  let [id] = await db('accounts').insert(account);
  return getById(id);
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account);
  return getById(id);
}

const deleteById = async id => {
  const deletedAccount = await getById(id);
  await db('accounts').where('id', id).del();
  return deletedAccount;
}

// Exports
module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
