import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const addProducts = async () => {
    const res = await axios.post('/products', formData)
    // setProducts(res.data);
    console.log(res);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      discountPercentage: parseFloat(formData.discountPercentage),
      rating: parseFloat(formData.rating),
      stock: parseInt(formData.stock),
      brand: formData.brand,
      category: formData.category,
      thumbnail: formData.thumbnail,
    };
    await addProducts()
    console.log('Formatted Data:', formattedData);
    setFormData({
      title: '',
      description: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: '',
      category: '',
      thumbnail: '',
    });
    // You can perform further actions like sending the data to a server here
  };

  return (
    <div className="container mt-5">
      <div style={{ margin: "10px" }}>
        <Link to={`/`} className="btn btn-primary">
          Home
        </Link>

      </div>
      <h2 className="mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Discount Percentage:</label>
          <input type="number" className="form-control" name="discountPercentage"
            value={formData.discountPercentage} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Rating:</label>
          <input type="number" className="form-control" name="rating" value={formData.rating} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock:</label>
          <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Brand:</label>
          <input type="text" className="form-control" name="brand" value={formData.brand} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Thumbnail:</label>
          <input type="text" className="form-control" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
