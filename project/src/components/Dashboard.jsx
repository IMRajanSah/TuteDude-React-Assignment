import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Cards from './Cards'
import { FinanceContext } from '../store/FinanceContext'
import Chart from 'react-apexcharts';
import MonthlyExpenseChartOverTime from './MonthlyExpenseChartOverTime';
import MonthlyExpensesBreak from './MonthlyExpensesBreak';

const Dashboard = () => {
  const {profile,transactions,budget}=useContext(FinanceContext)
  
  const calculateIncomeAmount = ()=>{
    var incomeAmount=0
    transactions.forEach(item => {
      if(item.tranaction_type.toLowerCase()==='income'){
        incomeAmount+=item.amount
      }
    });
    return incomeAmount
  }
  const calculateExpenseAmount = ()=>{
    var expenseAmount=0
    transactions.forEach(item => {
      if(item.tranaction_type.toLowerCase()==='expense'){
        expenseAmount+=item.amount
      }
    });
    return expenseAmount
  }
  const calculateRemainingBudget = ()=>{
    // budget-expense
    var budgetAmount=0
    budget.forEach(item => {
      budgetAmount+=item.price
    });

    var expenseAmount=0
    transactions.forEach(item => {
      if(item.tranaction_type.toLowerCase()==='expense'){
        expenseAmount+=item.amount
      }
    });
    return budgetAmount-expenseAmount
  }
  const calculateSavings = ()=>{
    var savingsAmount=0
    transactions.forEach(item => {
      if(item.tranaction_type.toLowerCase()==='income'){
        savingsAmount+=item.amount
      }else{
        savingsAmount-=item.amount
      }
    });
    return savingsAmount
  }
  
  const now = new Date();
const currentYear = now.getFullYear();
  return (
    <Container className='dashboard-mobile'>
        <div className='title'>
            {/* <h4>Dashbaord</h4> */}
        </div>
        <div className="content" >
        <div className="myinfos-mobile" >
            <div style={{border:'1px solid black',padding:'0rem 1rem',borderRadius:'5px'}}>
              <span>Monthly Expense Breakdown {`${now.toLocaleString('default', { month: 'long' })} ${currentYear}`} Over Time</span>
                    <MonthlyExpenseChartOverTime/> 
                    </div>
          <div style={{border:'1px solid black',padding:'0 1rem',borderRadius:'5px'}}>
          <span>Monthly Expense Breakdown {`${now.toLocaleString('default', { month: 'long' })} ${currentYear}`}</span>
          
                    <MonthlyExpensesBreak/>
                    </div>
        </div>
        <div className="myinfos-card-mobile" >
            <Cards title="Total Income" value={calculateIncomeAmount()}/>
            <Cards title="Total Expense" value={calculateExpenseAmount()}/>
            <Cards title="Remaining Budget" value={calculateRemainingBudget()}/>
            <Cards title="Savings" value={calculateSavings()}/>
        </div>
        </div>
    </Container>
  )
}

export default Dashboard