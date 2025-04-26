import React, { useContext, useEffect, useState } from 'react'
import Chart from 'react-apexcharts';
import { FinanceContext } from '../store/FinanceContext';

const MonthlyExpensesBreak = () => {
    const { transactions } = useContext(FinanceContext);
    const [chartConfig, setChartConfig] = useState(null);
    useEffect(() => {
        if (!transactions || transactions.length === 0) return;
    
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
    
        const currentMonthExpenses = transactions
          .filter(item => item.tranaction_type === 'expense')
          .filter(item => {
            const [day, month, year] = item.date.split('-').map(Number);
            const itemDate = new Date(year, month - 1, day);
            return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
          });
    
        
          console.log(currentMonthExpenses);
        let labels =[]
        let series =[]
        currentMonthExpenses.forEach(item=>{
            labels.push(item.category)
            series.push(item.amount)
        })
          
        setChartConfig({
          series,
          options: {
            chart: {
              type: 'donut',
            },
            labels,
            title: {
              text: ``,
              align: 'left',
              style: {
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#333',
              }
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: { width: 350},
                legend: { position: 'bottom' }
              }
            }],
            legend: {
              position: 'bottom'
            }
          }
        });
      }, [transactions]);
  return (
    <>
    {!chartConfig?<>Loading...</>:
    <Chart 
      options={chartConfig.options} 
      series={chartConfig.series} 
      type="donut" 
      width='350'
    />
    }
    </>
  )
}

export default MonthlyExpensesBreak