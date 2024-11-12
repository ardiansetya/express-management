const prisma = require('../db');
const { findAllCategories, insertCategories } = require('./categories.repository');

// get Categories
const getAllCategories = async () => {
   return await findAllCategories();
};

// post Categories
const createCategories = async (newCategoriesData) => {
   const createCategories = await insertCategories(newCategoriesData);
   return createCategories
};




module.exports = {
   createCategories,
   getAllCategories,
   // getAllCategoriesById,
};
