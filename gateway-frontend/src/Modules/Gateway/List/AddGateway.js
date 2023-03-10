import {Formik} from "formik";
import {APIPostCall} from "../../../Service/BaseServiceCaller";
import endpoints from "../../../Service/Endpoints";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function AddGateway(props) {
    const regex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <Formik
                initialValues={{
                    ip: "",
                    serial: "",
                    name: "",
                }} onSubmit={async (values, {setSubmitting}) => {
                try {
                    let formData = new FormData();
                    Object.keys(values).forEach((field) => {
                        formData.append(field, values[field]);
                    });
                    APIPostCall(endpoints.gateway.add, formData).then((res) => {
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
                    if (regex.test(values.ip) === false) {
                        errors.ip = "Wrong IP format"
                    }
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
                            <span>IP</span>
                            <input type={"text"} id={'ip'} name={'ip'}
                                   value={values.ip} onChange={handleChange}
                            ></input>
                            {errors&&errors.ip?<span style={{color:'red'}}>{errors.ip}</span>:<></>}

                        </div>
                        <div>
                            <span>Serial</span>
                            <input type={"text"} id={'serial'} name={'serial'}
                                   value={values.serial} onChange={handleChange}
                            ></input>
                        </div>
                        <div>
                            <span>Name</span>
                            <input type={"text"} id={'name'} name={'name'}
                                   value={values.name} onChange={handleChange}
                            ></input>

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

export default AddGateway
