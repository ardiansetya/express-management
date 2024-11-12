// src/api/items/controllers/itemsController.js
const prisma = require('../db');

const findAllItems = async () => {

      const items = await prisma.item.findMany();
      return items
   
};

// const getItemById = async (req, res) => {
//    try {
//       const { itemId } = req.params;
//       const item = await prisma.item.findUnique({
//          where: { id: parseInt(itemId) },
//       });
//       if (!item) {
//          return res.status(404).json({ message: 'Item not found' });
//       }
//       res.json(item);
//    } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//    }
// };

const insertItem = async (newItemData) => {

      const itemData = await prisma.item.create({
         data: {
            name: newItemData.name,
            description: newItemData.description,
            price: newItemData.price,
            quantity: newItemData.quantity,
            categoryId : newItemData.categoryId,
            supplierId: newItemData.supplierId,
            createdBy: newItemData.createdBy
         },
      });
      return itemData
   
};

module.exports = {
   findAllItems,
   insertItem,
};