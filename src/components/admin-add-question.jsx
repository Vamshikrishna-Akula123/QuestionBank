import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


export function AdminAddQuestion(){

    const [categories, setCategories] = useState([{Id:0, Category:''}]);                                           

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            que: '',
            opt1: '',
            opt2: '',
            opt3: '',
            opt4: '',
            type: 'easy',
            ans: 'A',
            CategoryName: '',
            Id: 0
        },
        onSubmit: (question)=>{
            axios.post(`http://127.0.0.1:5080/add-question`, question)
            console.log(question);
            alert('Question Added Successfully..');
            navigate('/admin-dashboard');
        }
    });

    // useEffect(()=>{

    //     axios.get(`http://127.0.0.1:5080/get-categories`)
    //     .then(response=>{
    //         response.data.unshift({
    //             Id: 0,
    //             Category: 'Select a Category'
    //         })
    //         setCategories(response.data);
    //     })

    // }, []);

    return(
        <div className="m-3 p-3 bg-light">
            <h3>Add New Question</h3>
            <form onSubmit={formik.handleSubmit} style={{height:'250px'}} className=" overflow-auto ">                                      
                <dl>
                    <dt>que</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control" name="que" /></dd>
                    <dt>opt1</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control w-25" name="opt1" /></dd>
                    <dt>opt2</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control w-25" name="opt2" /></dd>
                    <dt>opt3</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control w-25" name="opt3" /></dd>
                    <dt>opt4</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control w-25" name="opt4" /></dd>
                    <dt>type</dt>
                    <dd>
                        <select className="form-select w-25" name="type" onChange={formik.handleChange}>
                            <option value="">Select a Category</option> 
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </dd>
                    <dt>ans</dt>
                    <dd>
                        <select className="form-select w-25" name="type" onChange={formik.handleChange}>
                            <option value="opt1">A</option>
                            <option value="opt2">B</option>
                            <option value="opt3">C</option>
                            <option value="opt4">D</option>
                        </select>
                    </dd>
                    <dt>Category Name</dt>
                    <dd>
                        <select className="form-select w-25" name="CategoryName" onChange={(event) => formik.setFieldValue("CategoryName", event.target.value)}>
                            <option value="English">English</option>
                            <option value="Aptitude">Aptitude</option>
                            <option value="Reasoning">Reasoning</option>
                        </select>
                    </dd>
                    <dt>Id (Question Number)</dt>
                    <dd>
                        <input type="number" name="Id" className="form-control w-25" onChange={(event) => formik.setFieldValue("Id", Number(event.target.value))} />
                    </dd>
                </dl>
                <button className="btn btn-success">Add Question</button>
                <Link to="/admin-dashboard" className="btn btn-danger ms-2">Cancel</Link>
            </form>
        </div>
    )
}


