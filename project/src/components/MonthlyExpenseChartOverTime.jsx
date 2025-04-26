import React, { useContext, useEffect, useState } from 'react'
import { FinanceContext } from '../store/FinanceContext';
import Chart from 'react-apexcharts';

const MonthlyExpenseChartOverTime = () => {
    const {profile,transactions,budget}=useContext(FinanceContext)
      const [chartData, setChartData] = useState(null);
    useEffect(() => {
        if (!transactions || transactions.length === 0) return; 
    
        const now = new Date(); 
    const currentMonth = now.getMonth(); 
    const currentYear = now.getFullYear();

    const expenses = transactions
      .filter(item => item.tranaction_type === 'expense') 
      .filter(item => { 
        const [day, month, year] = item.date.split('-').map(Number);
        const itemDate = new Date(year, month - 1, day);
        return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
      });
    
        const sortedExpenses = [...expenses].sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split('-').map(Number);
          const [dayB, monthB, yearB] = b.date.split('-').map(Number);
          const dateA = new Date(yearA, monthA - 1, dayA);
          const dateB = new Date(yearB, monthB - 1, dayB);
          return dateA - dateB;
        });
    
        setChartData({
          options: {
            chart: { id: 'monthly-expenses' },
            xaxis: {
              categories: sortedExpenses.map(exp => `${exp.date} (${exp.category})`),
              title: { text: 'Date and Expense' },
            },
            title: {
              text: '',
              align: 'center',
              style: { fontSize: '20px', fontWeight: 'bold', color: '#333' },
            },
            yaxis: {
              title: { text: 'Amount (₹)' },
            },
            stroke: { curve: 'smooth' },
            markers: { size: 5 },
            tooltip: {
              y: { formatter: (val) => `₹${val}` },
            },
          },
          series: [
            {
              name: 'Expenses',
              data: sortedExpenses.map(exp => exp.amount),
            }
          ]
        });
      // console.log(sortedExpenses);
      }, [transactions]);
  return (
    <>
    {!chartData?<>loading....</>:
    <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            width="375"
            height="300"
          />
  }
  </>
  )
}

export default MonthlyExpenseChartOverTime