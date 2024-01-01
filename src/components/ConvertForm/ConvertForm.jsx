// src/components/ConvertForm/ConvertForm.js

import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './ConvertForm.css';

const ConvertForm = () => {
  const [cryptos, setCryptos] = useState([]);
  const [formData, setFormData] = useState({
    sourceCrypto: '',
    amount: 0,
    targetCurrency: 'USD',
  });
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState('');
  const [converting,setConverting]=useState(false)
  const [loadingCurrency,setLoadingCurrency]=useState(false)

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setLoadingCurrency(true)
        const response = await axios.get('/cryptocurrencies');
        setCryptos(response.data);
        setLoadingCurrency(false)
      } catch (error) {
        console.error(error);
      }
    };

    fetchCryptos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate sourceCrypto, amount, and targetCurrency
    if (!formData.sourceCrypto || formData.amount <= 0 || !formData.targetCurrency) {
      setError('Please fill in all fields and ensure the amount is greater than 0.');
      return;
    }

    try {
      setConverting(true)
      const response = await axios.post('/convert', formData);
      setConvertedAmount(response.data.convertedAmount);
      setConverting(false)
      setError('');
    } catch (error) {
      console.error(error);
      setError('Error converting currencies. Please try again.');
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
          <h1>This application converts amounts between different cryptocurrencies.</h1>
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
              onChange={(e) =>
                setFormData({ ...formData, sourceCrypto: e.target.value })
              }
              required
            >
              <option value="" disabled>
               
                {loadingCurrency?"Loading":" Select Currency"}
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
              required
            >
              <option value="">Select Target Currency</option>
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
              //value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
            />
            <div>
              <span style={{ color: convertedAmount ? "green" : "red" }}>
                {formData.targetCurrency}
              </span>
              <p>{convertedAmount || '0.00'}</p>
            </div>
          </div>

          {error && <div className="error">{error}</div>}

          <button className='submit-btn' type="submit" style={{backgroundColor:`${converting?"#da6565":""}`}} disabled={converting}>{converting?"Converting...":"Convert"}</button>
          <p></p>
        </div>
      </div>
    </form>
  );
};

export default ConvertForm;
