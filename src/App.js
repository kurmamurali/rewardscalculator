import React, { useState, useEffect } from "react";
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Transactions from './Transactions';


function App() {
  const [userData, setUserData] = useState([]);
  const [transactions, setTransactions] = useState([]);

useEffect(() => {
    axios
      .get('http://localhost:3001/users')
      .then(response => {
        setUserData(response.data)
      })
  }, []);

 useEffect(() => {
    axios
      .get('http://localhost:3001/transactions')
      .then(response => {
        setTransactions(response.data)
      })
  }, []);
  return (
    <Container maxWidth="md">
    
    <h1>Transactions</h1>
    {
      userData.length && transactions.length > 0 ? ( <Transactions transactions={transactions} userData={userData} />) : 'Loading....'
    }
   <div>Footer Notes</div>
    </Container>
  );
}

export default App;
