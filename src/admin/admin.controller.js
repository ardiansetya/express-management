const express = require('express');
const { createAdmin, getAdmin } = require('../admin/admin.services');

const router = express.Router()


router.use(express.json())

router.post('/admin', async (req, res) => {
   try {
      const newAdminData = req.body
      console.log(req.body)
      const admin = await createAdmin(newAdminData);

      res.status(201).send({

         data: admin,
         message: 'Admin created successfully'

      });
   } catch (error) {
      res.status(400).send({ error });
   }
});

router.get('/admins', async (req, res) => {
   // try {
   //    const admin = await getAdmin();
   //    res.status(200).send(admin);
   // } catch (error) {
   //    res.status(500).json({ error: error.message });
   // }
   res.send('hellllo')
});



module.exports = router