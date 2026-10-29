
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/Cart.css';
import { formatPrice } from '../utils/currency';

const DONATION_AMOUNT = 5000;

const getNumericPrice = (price) => {
  if (typeof price === 'number') {
    return price;
  }

  const numericPrice = Number(
    String(price ?? '').replace(/[^0-9.-]/g, '')
  );

  return Number.isFinite(numericPrice) ? numericPrice : 0;
};

const RightSide = () => {
  const [input, setInput] = useState(false);
  const [stotal, setstotal] = useState(0);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      const price = getNumericPrice(item.price);
      const quantity = Number(item.qty) || 0;

      return acc + price * quantity;
    }, 0);

    setstotal(total);
  }, [cart]);

  const handleInput = () => {
    setInput((previous) => !previous);
  };

  const initPayment = (data) => {
    const options = {
      key: '',
      amount: data.amount,
      currency: data.currency,
      name: 'Kentucky Fried Chicken',
      description: 'Your Total Amount',
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL =
            'https://kfcapi.herokuapp.com/api/payment/verify';

          const { data } = await axios.post(verifyURL, response);
          console.log('Payment verification:', data);
        } catch (error) {
          console.error('Payment verification failed:', error);
        }
      },
      theme: {
        color: '#a50000',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderURL =
        'https://kfcapi.herokuapp.com/api/payment/orders';

      const { data } = await axios.post(orderURL, {
        amount: stotal + (input ? DONATION_AMOUNT : 0),
      });

      initPayment(data.data);
    } catch (error) {
      console.error('Payment initialization failed:', error);
    }
  };

  const total = stotal + (input ? DONATION_AMOUNT : 0);

  return (
    <>
      <h2 className="reciept_heading">{cart.length} ITEMS</h2>

      <div className="offers_deals_container">
        <img
          src="https://online.kfc.co.in/static/media/Offers_Coupon_Icon.72b94c41.svg"
          alt=""
        />
        <span className="cart_offers_text">Apply Offers & Deals</span>
        <button className="viewAll_button">View All</button>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <div>Subtotal</div>
        <div>{formatPrice(stotal)}</div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <div>GST</div>
        <div>{formatPrice(0)}</div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <div style={{ marginRight: '20px' }}>
          Restaurant Handling (Incl. Taxes)
        </div>
        <div>{formatPrice(0)}</div>
      </div>

      {input && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <div style={{ marginRight: '20px' }}>Add Hope</div>
          <div>{formatPrice(DONATION_AMOUNT)}</div>
        </div>
      )}

      <hr
        style={{
          color: 'grey',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      />

      <div className="donation_box">
        <div>
          <input
            checked={input}
            onChange={handleInput}
            type="checkbox"
          />
        </div>

        <div style={{ marginTop: '-17px' }}>
          <p>Donate {formatPrice(DONATION_AMOUNT)}. Tick to Add Hope.</p>
          <p>Support a community food initiative.</p>
        </div>

        <div>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAkCAYAAAApbHJOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA"
            alt=""
          />
        </div>
      </div>

      {path === '/cart' ? (
        <button
          onClick={() => navigate('/checkout')}
          className="redButton"
        >
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <p>Checkout</p>
            <p>{formatPrice(total)}</p>
          </div>
        </button>
      ) : (
        <button onClick={handlePayment} className="redButton">
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <p>Payment</p>
            <p>{formatPrice(total)}</p>
          </div>
        </button>
      )}
    </>
  );
};

export default RightSide;
