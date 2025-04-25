import './App.css';
import AddTransaction from './components/AddTransaction';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import TransactionHistory from './components/TransactionHistory';
import Budget from './components/Budget';
import Report from './components/Report';
import ProfileSettings from './components/ProfileSettings';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FinanceContext } from './store/FinanceContext';
import { useEffect, useState } from 'react';
import Axios from 'axios'
function App() {
  const [transactions,setTransactions]=useState([])
  const [budget,setBudget]=useState([])
  const [profile,setProfile]=useState({})
  const editTransaction=(oldItem,updatedItem)=>{
    // console.log(oldItem,updatedItem);
    // let edit1=transactions
    // setTransactions(prev =>
    //   prev.map(item =>
    //     item ===oldItem
    //       ? updatedItem
    //       : item
    //   )
    // );
    let edit1 = transactions.map(item =>
      item === oldItem ? updatedItem : item
    );
    // console.log(edit1);
    setTransactions(edit1)
    return edit1;

    
    
  }

  const deleteTransaction=(itemToDelete)=>{
    // setTransactions(prev => prev.filter(item => item !== itemToDelete));
    let filtered = transactions.filter(item => item !== itemToDelete);
    setTransactions(filtered);
    return filtered;

    
  }
  const createTransaction=(item)=>{
    // console.log('adding ',item);
    // console.log('prev ',transactions);
    let a1=transactions
    a1.push(item)
    setTransactions(a1)
    return a1
    // console.log('now ',transactions);

  }
  const editBudget=(item)=>{}
  const deleteBudget=(item)=>{}
  const createBudget=(item)=>{
    let a1=budget
    let flag=true
    a1.map(x=>{
      if(x.title===item.title){
        x.price+=item.price
        flag=false
      }
    })
    if(flag===true){
      a1.push(item)
    }
    console.log(a1);
    return a1
  }
  const editProfile=(item)=>{
    setProfile(item)
  }
  const deleteProfile=(item)=>{}
  const createProfile=(item)=>{}
  const pullFromFinanceAPI=(item)=>{
    Axios.get('https://68067059e81df7060eb726fd.mockapi.io/finance').then((res)=>{
      // console.log(res.data[0]);
      setTransactions(res.data[0].transactions)
      setBudget(res.data[0].budget)
      setProfile(res.data[0].profile)
      // console.log(res.data);
      
    }).catch((error)=>console.log(error))
  }
  const pushToFinanceAPI=(t,b,p)=>{
    // console.log({transactions,budget,profile});
    Axios.put('https://68067059e81df7060eb726fd.mockapi.io/finance/1',{"transactions":t,"budget":b,"profile":p}).then((res)=>console.log('posted the data')).catch((err)=>console.log('error in push'))
  }
  // console.log(transactions);
  useEffect(()=>{
    pullFromFinanceAPI()
  },[])
  return (
    <FinanceContext.Provider value={{transactions,budget,profile,editTransaction,deleteTransaction,createTransaction,editBudget,deleteBudget,createBudget,editProfile,deleteProfile,createProfile,pullFromFinanceAPI,pushToFinanceAPI}}>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/add-transaction' element={<AddTransaction/>}/>
        <Route path='/transaction-history' element={<TransactionHistory/>}/>
        <Route path='/budget' element={<Budget/>}/>
        <Route path='/report' element={<Report/>}/>
        <Route path='/profile-settings' element={<ProfileSettings/>}/>
        <Route path='*' element={<p style={{marginTop:'5rem',textAlign:'center',color:'red'}}>Invalid Route !!</p>}/>
      </Routes>
    </BrowserRouter>
    </FinanceContext.Provider>
  );
}

export default App;
