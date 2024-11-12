const express = require('express');
const prisma = require('../db');
const { createItem, getItems } = require('../items/item.services');

const router = express.Router()


router.use(express.json())

router.post('/items', async (req, res) => {
   try {

      const newItemData = req.body
      console.log(req.body)
      const item = await createItem(newItemData);

      res.status(201).send({
         
         data: item,
            message: 'Item created successfully'
    
      });
   } catch (error) {
      res.status(400).send({ error });
   }
});

router.get('/items', async (req, res) => {
   try {
      const items = await getItems();
      res.status(200).send(items);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});



module.exports = router