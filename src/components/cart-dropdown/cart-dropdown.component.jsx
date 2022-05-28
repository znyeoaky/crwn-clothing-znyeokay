import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Botton from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {

  const { cartItems } = useContext(CartContext);

  return(
    <div className='cart-dropdown-container'>
      <div className='cart-item'>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
        </div>
        <Botton>CHECKOUT</Botton>
    </div>
  );
};

export default CartDropdown;