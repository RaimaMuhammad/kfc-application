
import React from 'react';
import { formatPrice } from '../utils/currency';
import styles from './item.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addcart, addcartcount } from '../redux/action';
import { useNavigate } from 'react-router-dom';
import ProductImage from '../utils/ProductImage';
import cartIcon from '../assets/svg/cart.svg';

const Item = ({ _id, image, price, title, desc }) => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const id = _id || title;
  const count = cart.find((item) => item.id === id)?.qty || 0;
  const dispatch = useDispatch();

  return (
    <div className={styles.innerbox}>
      <ProductImage
        onClick={() => navigate(`/menu/${_id}`)}
        src={image}
        alt={title}
        title={title}
      />

      <div>
        <h3 className={styles.title}>{title}</h3>

        <p>
          <span
            style={{
              fontSize: '11px',
              background: 'red',
              color: 'red',
              borderRadius: '50%',
            }}
          >
            12
          </span>{' '}
          Non veg
        </p>

        <h3>{formatPrice(price)}</h3>

        <p className={styles.desc}>{desc}</p>

        <div className={styles.cartbutton}>
          <h3>
            {!count ? (
              <p
                className={styles.addto}
                onClick={() => {
                  dispatch(
                    addcart({
                      id,
                      image,
                      price,
                      title,
                      desc,
                      qty: 1,
                    })
                  );
                }}
              >
                Add to cart
              </p>
            ) : (
              <div>
                <button
                  className={styles.minus}
                  onClick={() => {
                    dispatch(
                      addcartcount({
                        id,
                        image,
                        price,
                        title,
                        desc,
                        qty: count - 1,
                      })
                    );
                  }}
                >
                  &#8211;
                </button>

                <span>{count}</span>

                <button
                  className={styles.plus}
                  onClick={() => {
                    dispatch(
                      addcartcount({
                        id,
                        image,
                        price,
                        title,
                        desc,
                        qty: count + 1,
                      })
                    );
                  }}
                >
                  &#43;
                </button>
              </div>
            )}
          </h3>

          <img
            className={styles.cartIcon}
            onClick={() => navigate('/cart')}
            src={cartIcon}
            alt="Open cart"
          />
        </div>
      </div>
    </div>
  );
};

export default Item;
