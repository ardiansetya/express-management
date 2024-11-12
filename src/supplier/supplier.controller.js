const express = require('express');
const { createSupplier, getAllSuplliers } = require('../supplier/supplier.services');

const router = express.Router()


router.use(express.json())

router.post('/Suppliers', async (req, res) => {
   try {

      const newSupplierData = req.body
      console.log(req.body)
      const Supplier = await createSupplier(newSupplierData);

      res.status(201).send({

         data: Supplier,
         message: 'Supplier created successfully'

      });
   } catch (error) {
      res.status(400).send({ error });
   }
});

router.get('/Suppliers', async (req, res) => {
   try {
      const Suppliers = await getAllSuplliers();
      res.status(200).send(Suppliers);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});



module.exports = router