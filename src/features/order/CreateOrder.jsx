import { useState } from 'react';
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  clearCart,
  getCart,
  getTotalCartPrice,
} from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ]

function CreateOrder() {
  const [withPriority, setWithPriority] =
    useState(false);

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress =
    addressStatus === 'loading';
  const dispatch = useDispatch();
  const navigation = useNavigation(); //returns a navigation object whose state can be loading ,idle,or submitiing
  const isSubmitting =
    navigation.state === 'submitting';
  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(
    getTotalCartPrice
  );
  const priorityPrice = withPriority
    ? totalCartPrice * 0.2
    : 0;
  const totalPrice =
    totalCartPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />;
  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>
        Ready to order? Let's go!
      </h2>
      {/* Form component is provided by react router dom  */}
      {/* we are doing a post request to create a new order. */}
      {/* Then we could also specify the action where we could then write the path that this form should
      be submitted to. But this is not going to be necessary, because by default, React Router will
      simply match the closest route, */}
      {/* <Form method="POST" action="/order/new"> */}
      <Form method='POST'>
        <div className='mb-5 flex grow flex-col gap-2 sm:flex-row sm:items-center'>
          <label className=' sm:basis-40'>
            First Name
          </label>
          <input
            type='text'
            name='customer'
            required
            defaultValue={username}
            className='input grow'
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>
            Phone number
          </label>
          <div className='grow'>
            <input
              type='tel'
              name='phone'
              required
              className='input w-full'
            />
            {formErrors?.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row   sm:items-center'>
          <label className='sm:basis-40'>
            Address
          </label>
          <div className='grow'>
            <input
              type='text'
              name='address'
              required
              className='input w-full'
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === 'error' && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {errorAddress}
              </p>
            )}
          </div>
          <span className='absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]'>
            {!position.latitude &&
              !position.longitude && (
                <Button
                  type='small'
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                  disabled={isLoadingAddress}
                >
                  Get Position
                </Button>
              )}
          </span>
        </div>

        <div className='gap mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority}
            onChange={(e) =>
              setWithPriority(e.target.checked)
            }
          />
          <label
            htmlFor='priority'
            className='font-medium'
          >
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* JSON.stringify because value cannot be object */}
          <input
            type='hidden'
            name='cart'
            value={JSON.stringify(cart)}
          />
          <input
            type='hidden'
            name='position'
            value={
              position.longitude
                ? `${position.latitude},${position.longitude}`
                : ' '
            }
          />

          <Button
            disabled={
              isSubmitting || isLoadingAddress
            }
            type='primary'
          >
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(
                  totalPrice
                )}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
// The action function is an asynchronous function that takes a request object as an argument.
//  This request object contains information about the incoming HTTP request,
// including the form data submitted.
export async function action({ request }) {
  const formData = await request.formData();
  //  method is used to extract form data from the incoming HTTP request. This data is typically sent from a form on the client side.

  console.log(formData);

  // The Object.fromEntries() method is used to transform a list of key-value pairs (in the form of an array) into an object
  const data = Object.fromEntries(formData);

  // Here, request.formData() is likely making a network request and getting form data from the response. This form data is represented as a FormData object, and Object.fromEntries(formData) is used to convert it into a plain JavaScript object.

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give your correct phone no,we might need to contat you';
  if (Object.keys(errors).length > 0)
    return errors;

  //if everything is okay create new order and react
  const newOrder = await createOrder(order);

  //   So this is basically another function that is provided to us

  // by React Router, which basically will just create

  // a new response or a new request.

  // dispatching on store can be less efficient,use it as a escape hatch
  //dont overuse this technique
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
  // return null;
  // React Router setup, this line of code would change the current route to the specified URL, causing the associated React component for that route to render.
}

export default CreateOrder;
