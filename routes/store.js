const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/storeItem');
// const {handleErrors} = require('../utilities/utilities.js')
// const {contactsValidator, contactRules, idRules} = require('../utilities/validator.js')

router.get('/',  contactsController.getAll);
router.get('/:id',  contactsController.getOne);
router.post('/', contactsController.createNewStoreItem);
router.put('/:id', contactsController.updateStoreItem);
router.delete('/:id', contactsController.deleteStoreItem);

// 


module.exports = router;