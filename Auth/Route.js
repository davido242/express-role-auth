const express = require("express");
const router = express.Router();
const { register, login, update, deleteUser, allUsers } = require('./Auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/update').put(update);
router.route('/delete').delete(deleteUser);
router.route('/users').get(allUsers);
module.exports = router;