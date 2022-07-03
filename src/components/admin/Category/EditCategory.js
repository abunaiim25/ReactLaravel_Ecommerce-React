import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';



const EditCategory = (props) => {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    //========view data from Database==========
    const category_id = props.match.params.id;
    useEffect(() => {
        axios.get(`/api/edit-category/${category_id}`).then(res => {
            //console.log(res.data.category)
            if (res.data.status === 200) {
                setCategory(res.data.category)
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-category');
            }
            setLoading(false);
        });
    }, [props.match.params.id, history]);

    //===========update Category submit==============
    const updateCategory = (e) => {
        e.preventDefault();
        //put
        const category_id = props.match.params.id;
        const data = categoryInput;
        axios.put(`/api/update-category/${category_id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setErrors([]);
                history.push('/admin/view-category');
            }
            else if (res.data.status === 422) {//if input field not fillup / error on input field and also awal message
                swal("All Fields Are Mandetory","", "error");
                setErrors(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-category');
            }
        });
    }

    //==========loading==============
    if (loading) {
        return <h4>Loading Edit Category...</h4>
    }


    return (
        <>
            <div className="container-fluid px-4">

                <h1 class="mt-4">Category</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item"><Link className='link' to={'/admin/view-category'}>View Category</Link></li>
                    <li class="breadcrumb-item active">Edit Category</li>
                </ol>

                <div className="card mt-4">
                    <div className="card-header">
                        <h4>Edit Category
                            <Link className='btn btn-success btn-sm float-end' to="/admin/view-category">Back</Link>
                        </h4>
                    </div>

                    <div className="card-body">
                        <form onSubmit={updateCategory}>
                            {/**nab tabs button */}
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item " role="presentation">
                                    <button className="nav-link active link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                                </li>
                            </ul>

                            {/**nab tabs pages */}
                            <div className="tab-content" id="myTabContent">
                                {/**nab tabs home page*/}
                                <div className="tab-pane card-body border fade show active p-3" id="home" role="tabpanel" aria-labelledby="home-tab">

                                    <div className="form-group mb-3">
                                        <label>Slug</label>
                                        <input type="text" name='slug' onChange={handleInput} value={categoryInput.slug} className='form-control' />
                                        <small className='text-danger'>{errors.slug}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" name='name' onChange={handleInput} value={categoryInput.name} className='form-control' />
                                        <small className='text-danger'>{errors.name}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Description</label>
                                        <textarea name='description' onChange={handleInput} value={categoryInput.description} className='form-control'></textarea>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Status</label>
                                        <input type="checkbox" onChange={handleInput} value={categoryInput.status} name='status' /> status 0=shown/1=hidden
                                    </div>
                                </div>

                                {/**nab tabs SEO page*/}
                                <div className="tab-pane card-body border fade p-3" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">

                                    <div className="form-group mb-3">
                                        <label>Meta Title</label>
                                        <input type="text" name='meta_title' onChange={handleInput} value={categoryInput.meta_title} className='form-control' />
                                        <small className='text-danger'>{errors.meta_title}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta Keywords</label>
                                        <textarea name='meta_keywords' onChange={handleInput} value={categoryInput.meta_keywords} className='form-control'></textarea>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta Description</label>
                                        <textarea name='meta_description' onChange={handleInput} value={categoryInput.meta_description} className='form-control'></textarea>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary px-4 my-4 float-end">Update</button>
                        </form>
                    </div>
                </div>


            </div>
        </>
    )
}

export default EditCategory
