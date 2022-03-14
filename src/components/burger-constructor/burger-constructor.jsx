import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.js';

const BurgerComponents = ({ingredients}) => {
  const addsIngredients = ingredients.filter((item) => item.type !== 'bun')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className = {`${burgerConstructorStyles.ingredientsBlock} ml-5 mr-5`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${ingredients[0].name} (верх)`}
        price={ingredients[0].price}
        thumbnail={ingredients[0].image}
      />
      {addsIngredients.map((ingredient) => {
        return (
          <ConstructorElement
          text={`${ingredient.name}`}
          price={`${ingredient.price}`}
          thumbnail={`${ingredient.image}`}
        />
        ) 
      })}
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${ingredients[0].name} (низ)`}
        price={ingredients[0].price}
        thumbnail={ingredients[0].image}
      />
  </div>
  )
}

class BurgerConstructor extends React.Component {
  render() {
    return (
      <>
      <BurgerComponents ingredients={data}/>
      </>
    )
  }
}

export default BurgerConstructor;
