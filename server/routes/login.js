const express    = require('express');
const router     = express.Router();
const jwt        = require('../helpers/juwita');
const login      = require('../controllers/login');

console.log('=====masuk router login');
router.get('/', login.allData);
router.post('/', login.postData);
// router.get('/:id', login.singleData);
// router.put('/:id', login.updateData);
// router.delete('/:id', login.deleteData);

//endpoint login fb, setelah login, di html di redirect ke halaman todo
//di html todo, check token dulu
console.log('=========');
router.get('/fb', login.setFBAccessToken, login.getUserFB)

module.exports = router
