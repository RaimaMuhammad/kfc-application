
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addcart, addcartcount } from '../redux/action';
import styles from './item.module.css';
import Reccom from './Reccom';
import Beverages from './Beverages';
import { useNavigate } from 'react-router-dom';
import ProductImage from '../utils/ProductImage';
import cartIcon from '../assets/svg/cart.svg';
import { formatPrice } from '../utils/currency';

const SingleItem = ({ _id, image, price, title, desc }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const id = _id || title;
  const count = cart.find((item) => item.id === id)?.qty || 0;
  const navigate = useNavigate();

  return (
    <div className={styles.singleupperbox}>
      <div className={styles.mainsinglebox}>
        <ProductImage src={image} alt={title} title={title} />

        <h2>{title}</h2>
        <p className={styles.singledesc}>{desc}</p>
        <p>Calories {Math.round(Math.random() * (2000 - 1000) + 1000)}</p>

        <h2>{formatPrice(price)}</h2>

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

        <h1 className={styles.pepsi}>
          You can enjoy this delicious dish with
        </h1>

        <Beverages />
      </div>

      <div>
        <Reccom />
      </div>
    </div>
  );
};

export default SingleItem;
