




const idRules = () => {
    return [
        param("/:id").isLength(24)
    ]
}



module.exports = {contactRules, contactsValidator, idRules}