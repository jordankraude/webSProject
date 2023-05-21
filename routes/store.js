const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/storeItem');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getOne)
router.post('/', contactsController.createNewStoreItem);
router.put('/:id', contactsController.updateStoreItem);
router.delete('/:id', contactsController.deleteStoreItem);


module.exports = router;