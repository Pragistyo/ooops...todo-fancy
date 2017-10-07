const express    = require('express');
const router     = express.Router()
const todo       = require('../controllers/todo');

console.log('+++++++++++++++ router todo');
router.get('/', todo.allData);
router.post('/', todo.postData);
router.get('/:id', todo.categoryData);
router.put('/:id', todo.updateData);
router.delete('/:id', todo.deleteData);

module.exports = router
