import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export function AdminDashboard(){

    const [question, setQuestion] = useState([{que:'', opt1:'', opt2:'', opt3:'', opt4:'', type:'', ans:'', CategoryName:'', Id:0}]);                                                                    

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5080/get-questions`)
        .then(response=>{
            setQuestion(response.data);
        });
    }, [])

    return(
        <div className="bg-light p-3 m-5">
            <h3>Admin Dashboard</h3>
            <div className="mb-3">
                <Link to='/add-question' className="btn btn-primary bi bi-node-plus-fill">Add Question</Link>
            </div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            question.map(question=>
                                <tr key={question.Id}>
                                    <td>{question.Id}</td>
                                    <td>
                                        {question.que}
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td className="px-5"><strong>A.</strong> {question.opt1}</td>
                                                    <td className="px-5"><strong>B.</strong> {question.opt2}</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-5"><strong>C.</strong> {question.opt3}</td>
                                                    <td className="px-5"><strong>D.</strong> {question.opt4}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>
                                        <div className="d-flex">
                                            <Link to={`/edit-question/${question.Id}`} className="bi bi-pen-fill btn btn-warning me-2"></Link>
                                            <Link to={`/delete-question/${question.Id}`} className="bi bi-trash-fill btn btn-danger"></Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}