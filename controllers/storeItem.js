const mongodb = require ('../db/connect')
const UserId = require ('mongodb').ObjectId
const {body, validationResult, param} = require("express-validator");

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

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('project').collection('storeItems').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
      console.log(lists)
    });
  }
catch(error) {
  
  res.status(500).json({message : "Your request was not able to be processed"})
  
   
  
  }
}

const getOne = async (req, res, next) => { 
  try {

    const userId = new UserId (req.params.id)
    if (!UserId.isValid(req.params.id)) {
      throw new Error("Invalid ID")
     }
    const result = await mongodb.getDb().db('project').collection('storeItems').find({_id: userId});
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
      console.log(lists[0])
    })

  }catch(error) {
  
  res.status(500).json({message : "Your request was not able to be processed"})
  
   
  
  }

}

const createNewStoreItem = async (req, res, next) => {
  try{
  if (!req.body.itemName || !req.body.itemCost || !req.body.itemQuantityInStock || !req.body.vendorID || !req.body.vendorLocation || !req.body.itemImagePath || !req.body.itemAlt){
    throw new Error("Empty Content")
  }
  const storeItem = {
    itemName: req.body.itemName,
    itemCost: req.body.itemCost,
    itemQuantityInStock: req.body.itemQuantityInStock,
    vendorID: req.body.vendorID,
    vendorLocation: req.body.vendorLocation,
    itemImagePath: req.body.itemImagePath,
    itemAlt: req.body.itemAlt}

  const result = await mongodb.getDb().db('project').collection('storeItems').insertOne(storeItem);
  console.log(result);
  if (result.acknowledged) {
    res.status(201).json(result);
  } 
  else {
    res.status(500).json(result.error)}
}
catch(error) {
  
  res.status(500).json({message : "Your request was not able to be processed"})
  
   
  
  }
}

const updateStoreItem = async (req, res, next) => {
  try{
    if (!req.body.itemName || !req.body.itemCost || !req.body.itemQuantityInStock || !req.body.vendorID || !req.body.vendorLocation || !req.body.itemImagePath || !req.body.itemAlt){
      throw new Error("Empty Content")
    }
    const storeItem = {
        itemName: req.body.itemName,
        itemCost: req.body.itemCost,
        itemQuanityInStock: req.body.itemQuantityInStock,
        vendorID: req.body.vendorID,
        vendorLocation: req.body.vendorLocation,
        itemImagePath: req.body.itemImagePath,
        itemAlt: req.body.itemAlt}

  const userId = new UserId (req.params.id)
  if (!UserId.isValid(req.params.id)) {
    throw new Error("Invalid ID")
    }

  const result = await mongodb.getDb().db('project').collection('storeItems').replaceOne({_id: userId}, storeItem);
  console.log(result);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } 
  else {
    res.status(500).json(result.error)}
  }
  catch(error) {
  
      res.status(500).json({message : "Your request was not able to be processed"})
      
       
      
      }
    }


  const deleteStoreItem = async (req, res, next) => {
    try{
    const userId = new UserId(req.params.id);
    if (!UserId.isValid(req.params.id)) {
      throw new Error("Invalid ID")
     }
    const result = await mongodb.getDb().db('project').collection('storeItems').deleteOne({ _id: userId }, true);
    console.log(result);
    if (result.deletedCount > 0) {
      res.status(204).send();
    } 
    else {
      res.status(500).json(result.error);
    }
  }
  catch(error) {
  
    res.status(500).json({message : "Your request was not able to be processed"})
    
     
    
    }
  };

module.exports = {getAll, getOne, createNewStoreItem, deleteStoreItem, updateStoreItem}

// 