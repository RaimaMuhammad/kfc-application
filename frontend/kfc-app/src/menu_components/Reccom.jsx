
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './item.module.css';
import ProductImage from '../utils/ProductImage';
import { formatPrice } from '../utils/currency';

const Reccom = () => {
  const [recom, setRecom] = useState([]);

  useEffect(() => {
    axios
      .get('https://kfcapi.herokuapp.com/api/searchapi/item/?search=classic')
      .then(({ data }) => {
        setRecom(data);
      })
      .catch((error) => {
        console.error('Error fetching recommended meals:', error);
      });
  }, []);

  return (
    <div>
      <h2 className={styles.reccomtitle}>Recommended Meals</h2>

      {recom.map((el, index) => (
        <div key={el._id || index} className={styles.recombox}>
          <div>
            <ProductImage
              src={el.image}
              alt={el.title}
              title={el.title}
            />
          </div>

          <div>
            <h3>{el.title}</h3>
            <p>{el.desc}</p>
            <h3>{formatPrice(el.price)}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reccom;
