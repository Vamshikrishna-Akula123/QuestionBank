import { Link } from "react-router-dom"

export function Home(){
    return(
        <div className="d-flex flex-column mt-5 align-items-center">
            <Link className="btn btn-light w-25" to="/admin-login">Admin Login</Link>                   
            <Link className="btn btn-warning w-25 my-4" to="/student-login">Student Login</Link>
            <Link className="btn btn-primary w-25" to="/student-register">Student Register</Link>
        </div>
    )
}