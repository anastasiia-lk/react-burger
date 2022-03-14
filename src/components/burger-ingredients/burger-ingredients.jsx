import React, { useState } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.js';

const IngredientsSelector = () => {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

const IngredientCard = ({ ingredient }) => {
  return (
    <div className = {`${burgerIngredientsStyles.card} ml-4 mr-2 mb-4 mt-4`}>
      <div className = {burgerIngredientsStyles.image} style={{ backgroundImage: 'url(' + ingredient.image + ')', backgroundSize: 'cover' }}>
      </div>
      <p className="text text_type_digits-default">1234567890</p>
      <CurrencyIcon type="primary" />
      <p className="text text_type_main-default">
        The quick brown fox jumps over the lazy dog.
      </p>
    </div>
  )
}

const IngredientsGrid = ({ingredientsType}) => {
  return (
    <div className = {`${burgerIngredientsStyles.ingredientsGrid}`}>
      {ingredientsType.map((ingredient) => {
        return <IngredientCard ingredient = {ingredient} key={ingredient._id}/>
      })
      }
    </div>
  )
} 

class BurgerIngredients extends React.Component {
  render() {
    return(
      <div className = {burgerIngredientsStyles.ingredientsSelector}>
        <p className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </p>
        <IngredientsSelector />
        <p className="text text_type_main-medium mt-10 mb-6">
          Булки
        </p>
        <IngredientsGrid ingredientsType={data.filter((item) => item.type==='bun')} />
        <p className="text text_type_main-medium mt-10 mb-6">
          Соусы
        </p>
        <IngredientsGrid ingredientsType={data.filter((item) => item.type==='sauce')} />
        <p className="text text_type_main-medium mt-10 mb-6">
          Начинки
        </p>
        <IngredientsGrid ingredientsType={data.filter((item) => item.type==='main')} />
      </div>
    )
  }
}

export default BurgerIngredients;