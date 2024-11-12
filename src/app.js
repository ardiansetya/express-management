const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const prisma = require('./db');



dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();



app.get('/', async(req, res) => {
   try {
      const [totalItems, totalCategories, totalSuppliers] = await Promise.all([
         prisma.item.count(),
         prisma.category.count(),
         prisma.supplier.count(),
      ]);

      const totalStockValue = await prisma.item.aggregate({
         _sum: { price: true },
      });

      res.json({
         totalItems,
         totalCategories,
         totalSuppliers,
         totalStockValue: totalStockValue._sum.price,
      });
   } catch (error) {
      res.status(500).json({ error: 'Error fetching system summary' });
   }
});




app.use(express.json())
app.use(cors());

const itemsController = require('./items/item.controller');
const supplierController = require('./supplier/supplier.controller');
const categoriesController = require('./categories/categories.controller');
const adminController = require('./admin/admin.controller')

app.use('/api', adminController)
app.use('/api', itemsController)
app.use('/api', supplierController)
app.use('/api', categoriesController)

app.listen(PORT, () => {
   console.log('Server started on port ' + PORT);
});