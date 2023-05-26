const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/storeItem');
const {handleErrors} = require('../utilities/utilities.js')
const {contactsValidator, contactRules} = require('../utilities/validator.js')

router.get('/', handleErrors(contactsController.getAll));
router.get('/:id', handleErrors(contactsController.getOne));
router.post('/', contactRules(), contactsValidator, handleErrors(contactsController.createNewStoreItem));
router.put('/:id', contactRules(), contactsValidator, handleErrors(contactsController.updateStoreItem));
router.delete('/:id', handleErrors(contactsController.deleteStoreItem));


module.exports = router;