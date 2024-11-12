const prisma = require('../db');
const { findAllItems, insertItem } = require('./item.repository');

// get item
const getItems = async () => {
   return await findAllItems();
};

// post item
const createItem = async (newItemData) => {
   const createItem = await insertItem(newItemData);
   return createItem
};




module.exports = {
   createItem,
   getItems,
   // getItemById,
};
