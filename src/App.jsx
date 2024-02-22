import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Home from './ui/Home';
import Error from './ui/Error';
import Menu, {
  loader as menuloader,
} from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, {
  loader as orderLoader,
} from './features/order/Order';
import AppLayout from './ui/AppLayout';
import { action } from './features/order/UpdateOrder';

// Array of route objects with 'path' and 'element' properties
//if there is any error in this router ,then Error component will be called
//Error component gets access to the error that has occured using the useRouteError()
const router = createBrowserRouter([
  //   since this one doesn't have a path,

  // it is technically called in React Router

  // a layout route now.

  //since we want error to appear withing the layout and not in a seperate page,we can place error elements inside of child routes where fetching has been taking place
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuloader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        //         And so now whenever there will be a new form submission

        // on this route right here, so on this path,

        // then this action that we specified here will be called.
        path: '/order/new',
        element: <CreateOrder />,

        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: action,
      },
    ],
  },
]);

//we create a function that fetches some data from an api

//we then provide that loader fn to one of our routes

//and that route will then fetch data

//and then in end it will be provided to the page component itself using a custom hook

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// So while the loaders that we used earlier are to read data,

// actions are used to write data or to mutate data.

// So a state that is stored on some server.

// Or in other words, actions allow us

// to manage this remote server state using action functions

// and forms that we then wire up to routes

// similar to what we did earlier with the loaders.

// that orders are made by sending a post request

// with the order data to the API.

// actions notes:

// So while the loaders that we used earlier are to read data,

// actions are used to write data or to mutate data.

// So a state that is stored on some server.

// Or in other words, actions allow us

// to manage this remote server state(data in api) using action functions

// and forms that we then wire up to routes

// tailwind comes with 5 break points

//these breakpoints are mobile first,i.e min-width media queries
