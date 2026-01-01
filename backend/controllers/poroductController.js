// import express from "express"
import { sql } from '../config/db.js'

// get produts from the db and send
export const getProducts = async (req, res) => {
  try {
    const products = await sql`
      SELECT * FROM products ORDER BY created_at DESC
    `
    console.log('ethprodut', products)
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.log('Error getProducts', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}

//create a new product and send the newest product info
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required' })
  }

  try {
    const newProduct = await sql`
    INSERT INTO products (name,price,image) VALUES(${name},${price},${image}) 
    RETURNING *
   `

    console.log('New Product added', newProduct)

    res.status(201).json({ success: true, data: newProduct[0] })
  } catch (error) {
    // throw and error
    console.log('Error in createProduc', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}

// get a single product
export const getProduct = async (req, res) => {
  const { id } = req.params

  try {
    const product = await sql`
   SELECT * FROM products WHERE id=${id}
   `

    res.status(200).json({ success: true, data: product[0] })
  } catch (error) {
    console.log('Error in getProduct', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}

// update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params
  const { name, price, image } = req.body

  try {
    const updateProduct = await sql`
  UPDATE products SET name=${name},price=${price},image=${image} WHERE id=${id}
  RETURNING *
  `
    if (updateProduct.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Product Not Found',
      })
    }
    res.status(200).json({ success: true, data: updateProduct[0] })
  } catch (error) {
    console.log('Error in updateProduct function', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}

// delete a specific produt
export const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const deletedProduct = await sql`
   DELETE FROM products WHERE id=${id} 
   RETURNING *
   `
    res.status(200).json({ success: true, data: deletedProduct })
  } catch (error) {
    console.log('Error in deleteProduc', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}
