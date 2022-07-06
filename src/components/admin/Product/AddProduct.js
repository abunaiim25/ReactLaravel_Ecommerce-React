import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';


const AddProduct = () => {
    document.title = "Add Product";
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [errorlist, setError] = useState([]);
    const [categorylist, setCategorylist] = useState([]);
    const [allCheckbox, setCheckboxes] = useState([]);
    const [picture, setPicture] = useState([]);
    const [productInput, setProduct] = useState({
        category_id: '',
        slug: '',
        name: '',
        description: '',
        meta_title: '',
        meta_keywords: '',
        meta_description: '',
        selling_price: '',
        orginal_price: '',
        quantity: '',
        brand: '',
    });
  
    //===========Input Fielde============
    const handleInput = (e) => {
        e.persist();
        setProduct({ ...productInput, [e.target.name]: e.target.value });
    }
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }
    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({ ...allCheckbox, [e.target.name]: e.target.checked });
    }
    
    //===========View Data =====================//for Category
    useEffect(() => {
        axios.get(`/api/all-category`).then(res => {
            if (res.data.status === 200) {
                setCategorylist(res.data.category)
            }
            setLoading(false);
        });
    }, []);


    //==========Form Submit==========
    const submitProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        //img
        formData.append('image', picture.image);
        //text
        formData.append('category_id', productInput.category_id);
        formData.append('slug', productInput.slug);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);
        formData.append('meta_title', productInput.meta_title);
        formData.append('meta_keywords', productInput.meta_keywords);
        formData.append('meta_description', productInput.meta_description);
        formData.append('selling_price', productInput.selling_price);
        formData.append('orginal_price', productInput.orginal_price);
        formData.append('quantity', productInput.quantity);
        formData.append('brand', productInput.brand);
        //checkbox
        formData.append('featured', allCheckbox.featured ? '1':'0');
        formData.append('popular', allCheckbox.popular ? '1':'0');
        formData.append('status', allCheckbox.status ? '1':'0');

        //post
        axios.post(`/api/store-product`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setProduct({
                    ...productInput, //after submit input field emtey
                    category_id: '',
                    slug: '',
                    name: '',
                    description: '',
                    meta_title: '',
                    meta_keywords: '',
                    meta_description: '',
                    selling_price: '',
                    orginal_price: '',
                    quantity: '',
                    brand: '',
                    image: '',
                });
                setError([]);
                history.push('/admin/view-product');
            }
            else if (res.data.status === 422) {
                swal("All Fields Are Mandetory", "", "error");
                setError(res.data.errors);
            }
        });
    }

    //loading
    if (loading) {
        return <h4>Loading Product...</h4>
    }

    return (
        <>
            <div className="container-fluid px-4">

                <h1 class="mt-4">Product</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item"><Link className='link' to={'/admin/dashboard'}>Dashboard</Link></li>
                    <li class="breadcrumb-item active">Add Product</li>
                </ol>


                <div className="card mt-4">
                    <div className="card-header">
                        <h4>Add Product
                            <Link className='btn btn-success btn-sm float-end' to="/admin/view-product">View Product</Link>
                        </h4>
                    </div>

                    <div className="card-body">
                        <form onSubmit={submitProduct} encType='multipart/form-data'>
                            {/**nab tabs button */}
                            <ul className="nav nav-tabs " id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#otherdetails-tags" type="button" role="tab" aria-controls="otherdetails-tags" aria-selected="false">Other Details</button>
                                </li>
                            </ul>

                            {/**nab tabs pages */}
                            <div className="tab-content" id="myTabContent">
                                {/**nab tabs home page*/}
                                <div className="tab-pane card-body border fade show active p-3" id="home" role="tabpanel" aria-labelledby="home-tab">

                                    <div className="form-group mb-3">
                                        <label>Select Category</label>
                                        <select name="category_id" onChange={handleInput} value={productInput.category_id} className='form-select' >
                                            <option>----- Select Category -----</option>
                                            {
                                                categorylist.map((item) => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <small className='text-danger'>{errorlist.category_id}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Slug</label>
                                        <input type="text" name='slug' onChange={handleInput} value={productInput.slug} className='form-control' />
                                        <small className='text-danger'>{errorlist.slug}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" name='name' onChange={handleInput} value={productInput.name} className='form-control' />
                                        <small className='text-danger'>{errorlist.name}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Description</label>
                                        <textarea name='description' onChange={handleInput} value={productInput.description} className='form-control'></textarea>
                                    </div>
                                </div>

                                {/**nab tabs SEO page*/}
                                <div className="tab-pane card-body border fade p-3" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">

                                    <div className="form-group mb-3">
                                        <label>Meta Title</label>
                                        <input type="text" name='meta_title' onChange={handleInput} value={productInput.meta_title} className='form-control' />
                                        <small className='text-danger'>{errorlist.meta_title}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta Keywords</label>
                                        <textarea name='meta_keywords' onChange={handleInput} value={productInput.meta_keywords} className='form-control'></textarea>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta Description</label>
                                        <textarea name='meta_description' onChange={handleInput} value={productInput.meta_description} className='form-control'></textarea>
                                    </div>
                                </div>

                                {/**nab tabs otherdetails page*/}
                                <div className="tab-pane card-body border fade p-3" id="otherdetails-tags" role="tabpanel" aria-labelledby="seo-tags-tab">

                                    <div className="row">
                                        <div className="form-group mb-3 col-md-4">
                                            <label>Selling Price</label>
                                            <input type="text" name='selling_price' onChange={handleInput} value={productInput.selling_price} className='form-control' />
                                            <small className='text-danger'>{errorlist.selling_price}</small>
                                        </div>
                                        <div className="form-group mb-3 col-md-4">
                                            <label>Orginal Price</label>
                                            <input type="text" name='orginal_price' onChange={handleInput} value={productInput.orginal_price} className='form-control' />
                                            <small className='text-danger'>{errorlist.orginal_price}</small>
                                        </div>
                                        <div className="form-group mb-3 col-md-4">
                                            <label>Quantity</label>
                                            <input type='number' name='quantity' onChange={handleInput} value={productInput.quantity} className='form-control'></input>
                                            <small className='text-danger'>{errorlist.quantity}</small>
                                        </div>
                                        <div className="form-group mb-3 col-md-4">
                                            <label>Brand</label>
                                            <input type="text" name='brand' onChange={handleInput} value={productInput.brand} className='form-control' />
                                            <small className='text-danger'>{errorlist.brand}</small>
                                        </div>
                                        <div className="form-group mb-3 col-md-8">
                                            <label>Image</label>
                                            <input type="file" name='image' onChange={handleImage} className='form-control' />
                                            <small className='text-danger'>{errorlist.image}</small>
                                        </div>
                                        <div className="form-group mb-3 col-md-4">
                                            <label>Featured (checked-shown)</label>
                                            <input type="checkbox" name='featured' onChange={handleCheckbox} defaultChecked={allCheckbox.featured === 1 ? true:false} className='w-50 h-50'></input>
                                        </div>
                                        <div className="form-group mb-3 col-md-4">
                                            <label>Popular (checked-shown)</label>
                                            <input type="checkbox" name='popular' onChange={handleCheckbox} defaultChecked={allCheckbox.popular === 1 ? true:false} className='w-50 h-50'></input>
                                        </div>
                                        <div className="form-group mb-3 col-md-4">
                                            <label>Status (checked-shown)</label>
                                            <input type="checkbox" name='status' onChange={handleCheckbox} defaultChecked={allCheckbox.status === 1 ? true:false} className='w-50 h-50'></input>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary px-4 my-4 float-end">Submit</button>
                        </form>
                    </div>
                </div>


            </div>
        </>
    )
}

export default AddProduct
