import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Chart from 'react-apexcharts';
import MonthlyExpenseChartOverTime from './MonthlyExpenseChartOverTime';
import MonthlyExpensesBreak from './MonthlyExpensesBreak';
const Report = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  return (
    <Container style={{marginTop:"4rem"}} >
        <div className='title'>
            <h4>Report</h4>
        </div>
        <div className="content-report-mobile" >
            <div style={{border:'1px solid black',padding:'0rem 1rem',borderRadius:'5px'}}>
              <span>Monthly Expense Breakdown {`${now.toLocaleString('default', { month: 'long' })} ${currentYear}`} Over Time</span>
                    <MonthlyExpenseChartOverTime/> 
                    </div>
        <div style={{border:'1px solid black',padding:'0 1rem',borderRadius:'5px'}}>
          <span>Monthly Expense Breakdown {`${now.toLocaleString('default', { month: 'long' })} ${currentYear}`}</span>
          
                    <MonthlyExpensesBreak/>
                    </div>
        </div>

    </Container>
  )
}

export default Report