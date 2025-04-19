import React from 'react';
import mealsJson from '../Data/meals.json';
import IndividualMealItem from './IndividualMealItem';
import { Container, Row, Col } from 'react-bootstrap';
const Meals = () => {
  // console.log(mealsJson);
  return (
    <Container style={{ marginTop: '5rem', marginBottom: '3rem' }}>
      <Row className='g-4'>
        {mealsJson.map((meal) => (
          <Col key={meal.id} xs={12} sm={6} md={4} lg={3}>
            <IndividualMealItem
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          </Col>
        ))}
      </Row>
    </Container>
    // <>
    //   {mealsJson.map((meal)=>(
    //     <IndividualMealItem id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>
    //   ))}
    // </>
  );
};

export default Meals;
