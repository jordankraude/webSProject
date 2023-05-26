const mongodb = require ('../db/connect')
const UserId = require ('mongodb').ObjectId

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db('project').collection('storeItems').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
      console.log(lists)
    });
  };

const getOne = async (req, res, next) => { 
  const userId = new UserId (req.params.id)
  const result = await mongodb.getDb().db('project').collection('storeItems').find({_id: userId});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
    console.log(lists[0])
  })
}

const createNewStoreItem = async (req, res, next) => {
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

const updateStoreItem = async (req, res, next) => {
    const storeItem = {
        itemName: req.body.itemName,
        itemCost: req.body.itemCost,
        itemQuanityInStock: req.body.itemQuantityInStock,
        vendorID: req.body.vendorID,
        vendorLocation: req.body.vendorLocation,
        itemImagePath: req.body.itemImagePath,
        itemAlt: req.body.itemAlt}
  const userId = new UserId (req.params.id)
  const result = await mongodb.getDb().db('project').collection('storeItems').replaceOne({_id: userId}, storeItem);
  console.log(result);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } 
  else {
    res.status(500).json(result.error)}
  }


  const deleteStoreItem = async (req, res, next) => {
    const userId = new UserId(req.params.id);
    const result = await mongodb.getDb().db('project').collection('storeItems').deleteOne({ _id: userId }, true);
    console.log(result);
    if (result.deletedCount > 0) {
      res.status(204).send();
    } 
    else {
      res.status(500).json(result.error);
    }
  };

module.exports = {getAll, getOne, createNewStoreItem, deleteStoreItem, updateStoreItem}

// 