import {useEffect, useState} from "react";
import {APIGetCall, APIPostCall} from "../../../Service/BaseServiceCaller";
import endpoints from "../../../Service/Endpoints";
import {NavLink, useNavigate, useParams} from "react-router-dom";

function ListDevices(props) {
    const {id} = useParams();
    const [devices, setDevices] = useState([]);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        APIGetCall(endpoints.device.list,{gateway_id:id}).then((res) => {
            setDevices(res.data.devices);
        })
    }, [reload])
    return (
        <div>
            <button onClick={()=>{
                navigate(`/devices/add/${id}`)
            }}>ADD</button>
            <table className="table table-bordered">
                <thead>
                <th>ID</th>
                <th>UID</th>
                <th>Vendor</th>
                <th>Status</th>
                <th>Actions</th>
                </thead>
                <tbody>
                {
                    devices.length > 0 && devices.map((device) => {
                        return (
                            <tr>
                                <td>
                                    {device._id}
                                </td>
                                <td>
                                    {device.uid}
                                </td>
                                <td>
                                    {device.vendor}
                                </td>
                                <td>
                                    {device.status?"Online":"Offline"}
                                </td>
                                <td>
                                    <button
                                    style={{
                                    marginRight:'20px'}
                                    }
                                        onClick={()=>{
                                        navigate('/devices/edit/'+device._id,{
                                            state:{
                                                data:device,
                                            }
                                        });
                                    }}>Edit</button>
                                    <button onClick={()=>{
                                        APIPostCall(endpoints.device.delete,{id:device._id}).then((res) => {
                                            setReload(prevState => !prevState)
                                        })}
                                    }>Delete</button>

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
export default ListDevices;
