import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Chart from 'react-apexcharts';
const Report = () => {
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
  return (
    <Container style={{marginTop:"4rem"}}>
        <div className='title'>
            <h4>Report</h4>
        </div>
        <div className="content" style={{display:'flex',justifyContent:'center',gap:'1rem'}}>
            <div style={{marginTop:'',border:'1px solid black',padding:'1rem 0',borderRadius:'5px'}}>
        <Chart options={options} series={series} type="donut" width='375' />
        </div>
        <div style={{marginTop:'',border:'1px solid black',padding:'1rem 0',borderRadius:'5px'}}>
        <Chart options={options} series={series} type="donut" width='375' />
        </div>
        <div style={{marginTop:'',border:'1px solid black',padding:'1rem 0',borderRadius:'5px'}}>
        <Chart options={options} series={series} type="donut" width='375' />
        </div>
        </div>

    </Container>
  )
}

export default Report