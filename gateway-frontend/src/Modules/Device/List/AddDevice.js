import {Formik} from "formik";
import {APIPostCall} from "../../../Service/BaseServiceCaller";
import endpoints from "../../../Service/Endpoints";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function AddDevice(props) {
    const {id} = useParams();
    const regex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <Formik
                initialValues={{
                    uid: "",
                    vendor: "",
                    status: true,
                    gateway_id:id,
                }} onSubmit={async (values, {setSubmitting}) => {
                try {
                    let formData = new FormData();
                    Object.keys(values).forEach((field) => {
                        formData.append(field, values[field]);
                    });
                    APIPostCall(endpoints.device.add, formData).then((res) => {
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

export default AddDevice
