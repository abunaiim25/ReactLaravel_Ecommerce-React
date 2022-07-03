import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const AddCategory = () => {

    const history = useHistory();
    const [categoryInput, setCategory] = useState({
        slug: "",
        name: "",
        description: "",
        status: "",
        meta_title: "",
        meta_keywords: "",
        meta_description: "",
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keywords: categoryInput.meta_keywords,
            meta_description: categoryInput.meta_description,
        }

        //post
        axios.post(`/api/store-category`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                document.getElementById('CATEGORY_FORM').reset();
                history.push('/admin/view-category');
            }
            else if (res.data.status === 400) {
                setCategory({ ...categoryInput, error_list: res.data.errors });
            }
        });
    }

    //=====Required======
    var display_errors = [];
    if (categoryInput.error_list) {
        display_errors = [
            categoryInput.error_list.slug,
            categoryInput.error_list.name,
            categoryInput.error_list.meta_title,
        ]
    }

    return (
        <>
            <div className="container-fluid px-4">

            <h1 class="mt-4">Category</h1>
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item"><Link className='link' to={'/admin/dashboard'}>Dashboard</Link></li>
          <li class="breadcrumb-item active">Add Category</li>
        </ol>

                {/**=====Required======*/}
                {
                    display_errors.map((item) => {
                        return (<p className='mb-1' key={item}>{item}</p>)
                    })
                }
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>Add Category
                            <Link className='btn btn-success btn-sm float-end' to="/admin/view-category">View Category</Link>
                        </h4>
                    </div>

                    <div className="card-body">
                        <form onSubmit={submitCategory} id="CATEGORY_FORM">
                            {/**nab tabs button */}
                            <ul className="nav nav-tabs " id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
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
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" name='name' onChange={handleInput} value={categoryInput.name} className='form-control' />
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

                            <button type="submit" className="btn btn-primary px-4 my-4 float-end">Submit</button>
                        </form>
                    </div>
                </div>


            </div>
        </>
    )
}


export default AddCategory
