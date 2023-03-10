import {Formik} from "formik";
import {APIPostCall} from "../../../Service/BaseServiceCaller";
import endpoints from "../../../Service/Endpoints";
import {useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

function EditDevice(props) {
    const {id} = useParams();
    const regex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const deviceData = location.state.data;
    return (
        <div>
            <Formik
                initialValues={{
                    id:id,
                    uid: deviceData.uid,
                    vendor:deviceData.vendor,
                    status: deviceData.status,
                    gateway_id:deviceData.gateway_id,
                }} onSubmit={async (values, {setSubmitting}) => {
                try {
                    let formData = new FormData();
                    Object.keys(values).forEach((field) => {
                        formData.append(field, values[field]);
                    });
                    APIPostCall(endpoints.device.update, formData).then((res) => {
                        console.log(res)
                        if (res && res.data.statusCode === 200) {
                            navigate('/');
                        } else {
                            console.log(res)
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                } catch (e) {
                    console.log(e);
                }
            }
            }
                validate={(values) => {
                    setHasSubmitted(true);
                    const errors = {};
                    return errors;
                }}
                validateOnChange={hasSubmitted}
            >
                {({
                      setFieldValue,
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <span>UID</span>
                            <input type={"number"} id={'uid'} name={'uid'}
                                   value={values.uid} onChange={handleChange}
                            ></input>
                        </div>
                        <div>
                            <span>Vendor</span>
                            <input type={"text"} id={'vendor'} name={'vendor'}
                                   value={values.vendor} onChange={handleChange}
                            ></input>
                        </div>
                        <div>
                            <span>status</span>
                            <select type={"text"} id={'status'} name={'status'}
                                    value={values.status} onChange={handleChange}
                            >
                                <option value={true} onSelect={()=>setFieldValue('status',true)}>Online</option>
                                <option value={false}onSelect={()=>setFieldValue('status',false)}>Offline</option>
                            </select>

                        </div>
                        <div>
                            <button type="submit" onClick={() => {
                                console.log("AASDDDFFFGGG")
                            }}>Save
                            </button>
                        </div>
                    </form>)}
            </Formik>
        </div>
    )
}

export default EditDevice
