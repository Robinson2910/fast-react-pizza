import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
// import { useDispatch } from 'react-redux';
// import { fetchAddress } from '../user/userSlice';

function Menu() {
  // useLoaderData hook is used to access the data returned by the loader function.
  const menu = useLoaderData();
  // const dispatch = useDispatch();
  // space-x-4 - creates space btwn child elements
  //divide -creates a line btwn
  return (
    <>
      <ul className=' divide-y divide-stone-200 px-2'>
        {menu.map((pizza) => (
          <MenuItem
            pizza={pizza}
            key={pizza.id}
          />
        ))}
      </ul>
    </>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

// this data loader can be placed anywhere in our code base but convetntion seems to place the loader

//for the data of a certain page inside the file of that page

export default Menu;

// nice thing about this is that react router will start fetching the data at the same time as it starts rendering the correct route

//but the previus approach we used using useEffect was a fetch on render approach,so basically the component is rendered first and after the component

//is rendered we would start to fetch data,so that would then create data loading waterfalls
