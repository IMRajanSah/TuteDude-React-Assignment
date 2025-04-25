import { createContext } from 'react';

export const FinanceContext = createContext({
  transactions: [],
  budget: [],
  profile: {},
  editTransaction:(oldItem,updatedItem)=>{},
  deleteTransaction:(item)=>{},
  createTransaction:(item)=>{},
  editBudget:(item)=>{},
  deleteBudget:(item)=>{},
  createBudget:(item)=>{},
  editProfile:(item)=>{},
  deleteProfile:(item)=>{},
  createProfile:(item)=>{},
  pullFromFinanceAPI:()=>{},
  pushToFinanceAPI:()=>{}
});
