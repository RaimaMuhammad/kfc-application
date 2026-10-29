
import React from 'react';
import styles from './cart.module.css';
import { useDispatch } from 'react-redux';
import { addcartcount, deleteCart } from '../redux/action';
import ProductImage from '../utils/ProductImage';
import { formatPrice } from '../utils/currency';

const Cartproduct = ({ desc, id, image, price, qty, title }) => {
  const dispatch = useDispatch();

  const numericPrice =
    typeof price === 'number'
      ? price
      : Number(String(price ?? '').replace(/[^0-9.-]/g, ''));

  const safePrice = Number.isFinite(numericPrice) ? numericPrice : 0;
  const quantity = Number(qty) || 0;
  const itemTotal = safePrice * quantity;

  const handleRemove = () => {
    dispatch(deleteCart(id));
  };

  return (
    <div className={styles.cartproductmain}>
      <div className={styles.cartproductleft}>
        <ProductImage src={image} alt={title} title={title} />

        <div>
          <h3>{title}</h3>

          <ul>
            <li>{desc}</li>
          </ul>

          <h3
            style={{ cursor: 'pointer' }}
            onClick={handleRemove}
          >
            Remove
          </h3>
        </div>
      </div>

      <div className={styles.cartproductright}>
        <button
          disabled={quantity <= 1}
          onClick={() => {
            dispatch(
              addcartcount({
                id,
                image,
                price: safePrice,
                title,
                desc,
                qty: quantity - 1,
              })
            );
          }}
        >
          &#8211;
        </button>

        <h4>{quantity}</h4>

        <button
          onClick={() => {
            dispatch(
              addcartcount({
                id,
                image,
                price: safePrice,
                title,
                desc,
                qty: quantity + 1,
              })
            );
          }}
        >
          &#43;
        </button>

        <h3>{formatPrice(itemTotal)}</h3>
      </div>
    </div>
  );
};

export default Cartproduct;
