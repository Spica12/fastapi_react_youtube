import CryptocurrencyCard from "./components/cryptocurrencyCard.jsx"
import React, { useEffect, useState } from 'react';
import { Menu, Spin } from 'antd';
import axios from "axios";

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(1);
  const [currencyData, setCurrencyData] = useState(null);

  const fetchCurrencies = () => {
    axios.get("http://127.0.0.1:8000/currencies")
      .then(r => {
        const currenciesResponse = r.data;
        const menuItems = [
          {
            key: 'g1',
            label: 'List of Cryptocurrencies',
            children: currenciesResponse.map(c => ({
              label: c.name,
              key: c.id.toString() // Уникаємо помилки з key (він має бути string)
            })),
            type: 'group'
          }
        ];
        setCurrencies(menuItems);
      })
      .catch(error => {
        console.error("Error fetching currencies:", error);
      });
  };

  const fetchCurrency = () => {
    axios.get(`http://127.0.0.1:8000/currencies/${currencyId}`)
    .then(r => {
      setCurrencyData(r.data)
    })
  }

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    setCurrencyData(null)
    fetchCurrency();
  }, [currencyId]);

  const onClick = (e) => {
    setCurrencyId(e.key)
  };

  return (
    <div className="flex">
      <Menu
      onClick={onClick}
      style={{ width: 256 }}
      mode="inline"
      items={currencies}
      className="h-screen overflow-scroll"
      />
      <div className="mx-auto my-auto">
        {currencyData ? <CryptocurrencyCard currency={currencyData}/> : <Spin size="large"/>}
      </div>
    </div>
  );
};

export default App;
