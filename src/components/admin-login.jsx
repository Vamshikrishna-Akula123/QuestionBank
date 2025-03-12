import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export function AdminLogin(){

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (admin)=>{
            axios.get('http://127.0.0.1:5080/get-admin')
            .then(response=>{
                var user = response.data.find(item=> item.UserId===admin.UserId);                                                                                                          
                if(user){
                    if(admin.Password===user.Password){
                        navigate("/admin-dashboard")
                    }
                    else{
                        alert(`Inalid Password`);
                    }
                } else {
                    alert(`Invalid User Id`);
                }
            })
        }
    })

    return(
        <div className="bg-light p-4 m-4 w-25 mx-auto">
            <h3>Admin Login</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
                    <button className="btn btn-warning w-100">Login</button>
                    <Link to='/'>Back to Home</Link>
                </dl>
            </form>
        </div>
    )
}