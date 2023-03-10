import './App.css';
import {BrowserRouter} from "react-router-dom";
import RouterNavigator from "./Router/RouterNavigator";
import rootRoutes from "./Router/RootRoutes";
function App() {
  return (
    <BrowserRouter>
        <RouterNavigator paths={rootRoutes}/>
    </BrowserRouter>
  );
}

export default App;
