
import Product from './Components/Product/Product';
import Users from './Components/Users/Users';
import Order from './Components/Order/Order';
import Offs from './Components/Offs/Offs';
import Comments from './Components/Comments/Comments';

const routes = [
     {path:'/product', element: <Product/>},
     {path:'/comments', element: <Comments/>},
     {path:'/users', element: <Users/>},
     {path:'/orders', element: <Order/>},
     {path:'/offs', element: <Offs/>},

]

export default routes