import express from 'express';
import Food from '../models/food.js';
import { body } from 'express-validator';
import { validationResult } from 'express-validator';

const router = express.Router();



// Get all foods
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    console.log(err)
  }
});

// Create a new food
router.post('/', [
  body('name').notEmpty().trim().escape(),
  body('description').notEmpty().trim().escape(),
  body('price').isDecimal()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price } = req.body;

  try {
    const newFood = new Food({
      name,
      description,
      price,
    });

    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (err) {
   console.log(err)
  }
});

// Delete a food
router.delete('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    await food.remove();
    res.json({ message: 'Food deleted' });
  } catch (err) {
    console.log(err)  
  }
});

export default router;
