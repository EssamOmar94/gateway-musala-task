import {useEffect, useState} from "react";
import {APIGetCall, APIPostCall} from "../../../Service/BaseServiceCaller";
import endpoints from "../../../Service/Endpoints";
import {NavLink, useNavigate} from "react-router-dom";

function List(props) {
    const [gateways, setGateways] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        APIGetCall(endpoints.gateway.list).then((res) => {
            setGateways(res.data.gateways);
            console.log(res.data.gateways)
        })
    }, [])
    return (
        <div>
            <button onClick={()=>{
                navigate('/add');
            }}>ADD</button>
            <table className="table table-bordered">
                <thead>
                <th>ID</th>
                <th>IP</th>
                <th>Serial</th>
                <th>Name</th>
                <th>Actions</th>
                </thead>
                <tbody>
                {
                    gateways.length > 0 && gateways.map((gateway) => {
                        return (
                            <tr>
                                <td>
                                    {gateway._id}
                                </td>
                                <td>
                                    {gateway.ip}
                                </td>
                                <td>
                                    {gateway.serial}
                                </td>
                                <td>
                                    {gateway.name}
                                </td>
                                <td>
                                    <NavLink to={`/devices/${gateway._id}`}>Devices</NavLink>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}
    export default List;
