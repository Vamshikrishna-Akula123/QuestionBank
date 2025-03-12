import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom"


export function StudentRegister(){

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            StudentId: ''       ,
            StudentName: '',
            Password: '',
            Email: '',
            Mobile: ''
        },
        onSubmit: (student) => {
            axios.post(`http://127.0.0.1:5080/student-register`, student)                                          
            alert('Student Registered Successfully..');
            navigate('/student-login');
        }
    })

    return(
        <div className="bg-light m-3 p-3 w-25 mx-auto">
            <h3>Student Registration</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Student Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="StudentId" /></dd>
                    <dt>Student Name</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="StudentName" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" onChange={formik.handleChange} name="Email" /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Mobile" /></dd>
                </dl>
                <button className="btn btn-warning">Register</button>
                <div className="my-2">
                    <Link to="/student-login">Existing Student Login</Link>
                </div>
                <div className="my-2">
                    <Link to="/admin-login">Admin Login</Link>
                </div>
            </form>
        </div>
    )
}