import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Cards from './Cards'
import { FinanceContext } from '../store/FinanceContext'
import Chart from 'react-apexcharts';

const Dashboard = () => {
  const {profile,transactions,budget}=useContext(FinanceContext)
  // console.log(profile);
  const [series, setSeries] = useState([44, 55, 13, 43]); // Initial data
      const [labels, setLabels] = useState(['Rent', 'Groceries', 'Transport', 'Other']); // Initial data
      
    const [options, setOptions] = useState({
      chart: {
        type: 'donut',
      },
      title: {
          text: 'Monthly Expense Breakdown',  // 🔹 Title here
          align: 'left',
          style: {
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#333',
          }
        },
      labels: labels,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: { width: 300 },
          legend: { position: 'bottom' }
        }
      }],
      legend: {
        position: 'right'
      }
    });
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
  return (
    <Container style={{marginTop:"4rem"}}>
        <div className='title'>
            {/* <h4>Dashbaord</h4> */}
        </div>
        <div className="content" >
        <div className="myinfos-mobile" >
            <div style={{border:'1px solid black',padding:'1rem 0',borderRadius:'5px'}}>
                    <Chart options={options} series={series} type="donut" width='375' />
                    </div>
          <div style={{border:'1px solid black',padding:'1rem 0',borderRadius:'5px'}}>
                    <Chart options={options} series={series} type="donut" width='375' />
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