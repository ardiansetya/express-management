const express = require('express');
const prisma = require('../db');
const { createCategories, getAllCategories } = require('../categories/categories.services');

const router = express.Router()


router.use(express.json())

router.post('/categories', async (req, res) => {
   try {

      const newCategoriesData = req.body
      console.log(req.body)
      const Categories = await createCategories(newCategoriesData);

      res.status(201).send({

         data: Categories,
         message: 'Categories created successfully'

      });
   } catch (error) {
      res.status(400).send({ error });
   }
});

router.get('/categories', async (req, res) => {
   try {
      const categories = await getAllCategories();
      res.status(200).send(categories);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});



module.exports = router