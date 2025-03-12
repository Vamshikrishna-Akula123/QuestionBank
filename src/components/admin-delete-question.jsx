import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";


export function AdminDeleteQuestion(){

    const [questions, setQuestions] = useState([{que:'', opt1:'', opt2:'', opt3:'', opt4:'', type:'', ans:'', CategoryName:'', Id:0}]);                                                              

    let params = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5080/get-question/${params.Id}`)
        .then(response=>{
            setQuestions(response.data);
        })
    }, []);

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:5080/get-question/${params.id}`);
        navigate('/admin-dashboard');
    }

    return(
        <div>
            <h3>Are you sure? Want to Delete</h3>
            <dl>
                <dt>Id</dt>
                <dd>{questions[0].Id}</dd>
                <dt>Que</dt>
                <dd>{questions[0].que}</dd>
            </dl>
            <button onClick={handleDeleteClick}>Yes</button>
            <Link to="/admin-dashboard" className="btn btn-warning ms-2">No</Link>
        </div>
    )
}