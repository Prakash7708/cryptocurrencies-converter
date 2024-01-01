// src/components/ConvertForm/ConvertForm.js

import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './ConvertForm.css'
const ConvertForm = () => {
  const [cryptos, setCryptos] = useState([]);
  const [formData, setFormData] = useState({
    sourceCrypto: '',
    amount: 0,
    targetCurrency: 'USD',
  });
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('/cryptocurrencies');
        setCryptos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCryptos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/convert', formData);
      setConvertedAmount(response.data.convertedAmount);
    } catch (error) {
      console.error(error);
      alert(error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className='crypto-container'>
        <div className='crypto-container-left'>
            <navbar className="navbar">
                <p>Home</p>
                <p>News</p>
                <p>Community</p>
                <p>Help</p>
            </navbar>
            <h1>This application converts amounts between different crypto
                 currencies.</h1>

            <p>Discuss in crypto Community</p>

        </div>


        <div className='crypto-container-right'>
         <div>
            <button>Log In</button>
           <button>Sign Up</button>
         </div>

         <div className='selectoptions'>
         <select
                value={formData.sourceCrypto}
                // defaultValue={cryptos[0].symbol}
                onChange={(e) =>
                setFormData({ ...formData, sourceCrypto: e.target.value })
                }
            >
            <option value="" disabled selected>
        Select Currency
        </option>
                {cryptos.map((crypto) => (
                <option key={crypto.id} value={crypto.symbol}>
                    {crypto.name} ({crypto.symbol})
                </option>
                ))}
            </select>
            <select
            value={formData.targetCurrency}
            onChange={(e) =>
            setFormData({ ...formData, targetCurrency: e.target.value })
            }
        >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
             <option value="CHF">CHF</option>
             <option value="KYD">KYD</option>
             <option value="GBP">GBP</option>
             <option value="GIP">GIP</option>
             <option value="JOD">JOD</option>
             <option value="OMR">OMR</option>
             <option value="BHD">BHD</option>
              <option value="KWD">KWD</option>
                <option value="INR">INR</option>
         
            {/* Add more currencies as needed */}
        </select>
         </div>

         <div className='input-result'>
          
            <input
            type="number"
            placeholder='Enter Amount'
            // value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            />
            <div>
              <span style={{ color: convertedAmount ? "green" : "red" }}>
                {formData.targetCurrency}
              </span>
              <p>{convertedAmount || '0.00'}</p>
            </div>


         </div>
       
       
    
     
       
        <button className='submit-btn' type="submit">Convert</button>
       


   

      <p></p>
     

        </div>


    
    </div>
    </form>
  );
};

export default ConvertForm;
