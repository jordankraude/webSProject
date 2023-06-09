const {body, validationResult, url} = require("express-validator");


const contactRules = () => {
    return [
        body("itemName").trim().escape().isLength({min:1}).withMessage("Error, Item Name is required."),
        body("itemCost").trim().escape().isLength({min:1}).withMessage("Error, Item Cost is required."),
        body("itemQuantityInStock").trim().escape().isLength({min:1}).withMessage("Error, Quantity Required"),
        body("vendorID").trim().escape().isLength({min:1}).withMessage("Error, Vendor ID is required."),
        body("vendorLocation").trim().escape().isLength({min:1}).withMessage("Error, Vendor Location is required."),
        body("itemImagePath").trim().escape().isLength({min:1}).withMessage("Error, Item Image path is required."),
        body("itemAlt").trim().escape().isLength({min:1}).withMessage("Error, Item Description is required."),
    ]
}

const idRules = (urlOfId) => {
    return [
        url.isURL(urlOfId, )
    ]
}

const contactsValidator = (req, res, next) => {
    let errors = [];
    errors = validationResult(req)

    if (errors.isEmpty()){
        next();
        return
    }
    else {
        res.json(errors);
    }

}

module.exports = {contactRules, contactsValidator, idRules}