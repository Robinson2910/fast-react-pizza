import {
  Outlet,
  useNavigation,
} from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  // returns a navigation object
  //even if any of its child route is set to laoding
  //then this navigation state will be set to loading

  //   navigation.state
  // idle - There is no navigation pending.
  // submitting - A route action is being called due to a form submission using POST, PUT, PATCH, or DELETE
  // loading - The loaders for the next routes are being called to render the next page
  // console.log(navigation);
  const isLoading =
    navigation.state === 'loading';
  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto] '>
      {isLoading && <Loader />}

      <Header />
      <div className='overflow-auto'>
        <main className='mx-auto  max-w-3xl'>
          <Outlet />
          {/* In React Router v6, the <Outlet />{' '}
          component is used to mark the place in
          your component hierarchy where the child
          routes should be rendered. */}
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;

// <!-- Use NAviagtion -->

// useNAviagation wll be able to see wheter the application is currently idle ,loading or submitting

// and this info is actually for the entire app,not just for one page,but really here for the entire router

// so if one of these pages is loading then navigation state will become laoding no matter

// which of these oages is actually being loaded
