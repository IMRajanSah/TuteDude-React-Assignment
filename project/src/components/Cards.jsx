import React, { useContext } from 'react'
import { Card } from 'react-bootstrap';
import { FinanceContext } from '../store/FinanceContext';

const Cards = ({title,value}) => {
  const {profile} = useContext(FinanceContext)
  var currencyType
  if(profile.currency_type==='Rupee'){
    currencyType="Rs"
  }else{
    currencyType="$"
  }
  return (
    <div style={{width:'50rem'}}>
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{currencyType} {value}</Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Cards