import {
    Routes,
    Route
} from "react-router-dom";

function RouterNavigator(props) {
    return (
        <Routes>
            {
                props.paths.map((item, index) => {
                    return (
                        <Route key={index} path={item.path} element={item.component}/>
                    )
                })
            }
        </Routes>
    )
}

export default RouterNavigator;