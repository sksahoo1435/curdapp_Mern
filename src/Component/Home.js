import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import productData from '../../src/data.json'
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const Home = () => {
    const [products, setProducts] = useState();
    const [showModal, setShowModal] = useState(false);
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

    const getProducts = async () => {
        const res = await axios.get('/products')
        setProducts(res.data);
        console.log(res);
    }

    const deleteHandler = async (id) => {
        const res = await axios.delete(`/products/${id}`)
        console.log("deleted...", res)
        getProducts();
    }

    const handleEditClick = (product) => {
        setFormData(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleUpdateClick = async () => {
        try {
            const res = await axios.put(`/products/${formData._id}`, formData);
            console.log("updated...", res);
            getProducts();
            setShowModal(false);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <div style={{ margin: "10px" }}>
                <Link to={`/add`} className="btn btn-primary">
                    Add
                </Link>

            </div>
            <div className="container mt-4">
                <h2>Product List</h2>
                <div className="row">
                    {products && products.length > 0 && products.map(product => (
                        <div key={product.title} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img src={product.thumbnail} alt={product.title} className="card-img-top" style={{ height: '200px' }} />
                                <div className="card-body">
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                        <h5 className="card-title">{product.title}</h5>
                                        <h5 className="card-title">{product.price}</h5>
                                        <h5 className="card-title">{product.rating}</h5>
                                        <h5 className="card-title">{product.discountPercentage}</h5>
                                    </div>
                                    <p className="card-text">{product.brand}</p>
                                    <p className="card-text">{product.category}</p>
                                    <p className="card-text">{product.description}</p>

                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                        <Button variant="danger" onClick={(e) => deleteHandler(product._id)}>
                                            Delete
                                        </Button>

                                        <Button variant="success" onClick={() => handleEditClick(product)}>
                                            Edit
                                        </Button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-3">
                                <label className="form-label">Title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Category:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Price:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description:</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <Button variant="primary" onClick={handleUpdateClick}>
                                Update
                            </Button>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>

    );
};

export default Home;
