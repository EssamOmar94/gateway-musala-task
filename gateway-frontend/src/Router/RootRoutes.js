import List from "../Modules/Gateway/List/list";
import ListDevices from "../Modules/Device/List/ListDevices";
import AddGateway from "../Modules/Gateway/List/AddGateway";
import AddDevice from "../Modules/Device/List/AddDevice";
import EditDevice from "../Modules/Device/List/EditDevice";

const rootRoutes = [
    {path:"/", component: <List />},
    {path:"/add", component: <AddGateway />},
    {path:"/devices/:id", component: <ListDevices />},
    {path:"/devices/add/:id", component: <AddDevice />},
    {path:"/devices/edit/:id", component: <EditDevice />},
];

export default rootRoutes;
