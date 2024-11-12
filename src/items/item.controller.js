const express = require('express');
const prisma = require('../db');
const { createItem, getItems,getSummary } = require('../items/item.services');

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
   } catch (error) {z``
      res.status(500).json({ error: error.message });
   }
});

router.get('/items/summary', async (req, res) => {
   try {
      const { totalStock, totalValue, averagePrice } = await getSummary();
      res.status(200).json({ totalStock, totalValue, averagePrice });
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

router.get('/items/low-stock', async (req, res) => {
   try {
      const items = await prisma.item.findMany({
         where: { quantity: { lt: 5 } },
      });
      res.json(items);
   } catch (error) {
      res.status(500).json({ error: 'Error fetching low-stock items' });
   }
});

// Menampilkan barang berdasarkan kategori tertentu
router.get('items/category/:categoryId', async (req, res) => {
   const { categoryId } = req.params;
   try {
      const items = await prisma.item.findMany({
         where: { categoryId: parseInt(categoryId) },
      });
      res.json(items);
   } catch (error) {
      res.status(500).json({ error: 'Error fetching items by category' });
   }
});

// Menampilkan ringkasan per kategori
router.get('/items/category-summary', async (req, res) => {
   try {
      const summary = await prisma.item.groupBy({
         by: ['categoryId'],
         _sum: { price: true, quantity: true },
         _avg: { price: true },
         _count: { id: true },
      });
      res.json(summary);
   } catch (error) {
      res.status(500).json({ error: 'Error fetching category summary' });
   }
});

// Menampilkan ringkasan barang berdasarkan pemasok
router.get('/items/supplier-summary', async (req, res) => {
   try {
      const summary = await prisma.item.groupBy({
         by: ['supplierId'],
         _sum: { price: true, quantity: true },
         _avg: { price: true },
         _count: { id: true },
      });
      res.json(summary);
   } catch (error) {
      res.status(500).json({ error: 'Error fetching supplier summary' });
   }
});





module.exports = router