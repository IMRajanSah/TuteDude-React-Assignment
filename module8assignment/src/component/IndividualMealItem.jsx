import React, { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { MealContext } from '../Data/MealContext';
const IndividualMealItem = (props) => {
  const { id, name, description, price } = props;
  const elipsisClass = {
    display: '-webkit-box',
    WebkitLineClamp: 2, // Limit to 2 lines
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal', // Ensures text wraps
  };
  const { myMeals, addMeal, deleteMeal } = useContext(MealContext);
  const [localStoreMeal, setlocalStoreMeal] = useState([]);
  const [count, setCount] = useState(0);
  const handleAdd = () => {
    if (count > 0) {
      if (myMeals.some((meal) => meal.id === id)) {
        deleteMeal(id);
      }
      addMeal({
        id: id,
        name: name,
        description: description,
        price: price,
        amount: count,
      });
      // console.log(myMeals);
    }
  };
  // when page refreshed data is restored from local storage to state
  useEffect(() => {
    const savedMeals = localStorage.getItem('meals');
    if (savedMeals) {
      const parsedMeals = JSON.parse(savedMeals);
      parsedMeals.forEach((m) => {
        console.log('mount', m);
        addMeal(m);
      });
    }
  }, []);
  //sets in localstorage when mymeals changes
  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(myMeals));
  }, [myMeals]);

  return (
    // <div>{id},{name},{description},{price}</div>
    <Card style={{ minHeight: '15rem' }}>
      <Card.Body>
        <Card.Title style={elipsisClass}>{name}</Card.Title>
        <Card.Text style={elipsisClass}>{description}</Card.Text>
        <Card.Text>
          <strong>Price:</strong> ${price.toFixed(2)}
        </Card.Text>
        <div
          className='stepper'
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '1rem',
          }}
        >
          <Button
            size='sm'
            variant='outline-secondary'
            onClick={() => {
              count > 0 ? setCount(count - 1) : null;
            }}
          >
            -
          </Button>
          <div style={{ fontWeight: 'bold' }}>{count}</div>
          <Button
            size='sm'
            variant='outline-secondary'
            onClick={() => {
              count < 5 ? setCount(count + 1) : null;
            }}
          >
            +
          </Button>
          <Button size='sm' onClick={handleAdd}>
            Add
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default IndividualMealItem;
