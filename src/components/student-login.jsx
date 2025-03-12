import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


export function StudentLogin(){

    const [students, setStudents] = useState([{StudentId:'', StudentName:'', Password:'', Email:'', Mobile:''}]);                                                         
    const [cookies, setCookie, removeCookie] = useCookies(['studentname']);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            StudentId:'',
            Password:''
        },
        onSubmit: (student)=>{
            axios.get(`http://127.0.0.1:5080/get-students`)
            .then(response=>{
                var result = response.data.find(item=> item.StudentId===student.StudentId)
                if(result){
                    if(result.Password===student.Password){
                        setCookie('studentname', result.StudentName);
                        navigate('/student-dashboard');
                    }
                    else{
                        alert('Invalid Password');
                    }
                } else {
                    alert('Invalid Student Id');
                }
            })
        }
    })


    return(
        <div className="bg-light p-4 m-4 w-25 mx-auto">
            <h3>Student Login</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Student Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="StudentId" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning">Login</button>
                <div>
                    <Link to="/student-register">New Student Register</Link>
                </div>
            </form>
        </div>
    )

}