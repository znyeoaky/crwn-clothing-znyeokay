import Botton from '../button/button.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  return(
    <div className='cart-dropdown-container'>
      <div className='cart-item' />
        <Botton>CHECKOUT</Botton>
    </div>
  );
};

export default CartDropdown;