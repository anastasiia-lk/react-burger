import React, { useState } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
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
    <div className = {burgerIngredientsStyles.bunCard}>
      {ingredient.type}
    </div>
  )
}

const IngredientsGrid = ({ingredientsType}) => {
  return (
    <div className = {burgerIngredientsStyles.bunsSelector}>
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
        <IngredientsGrid ingredientsType={data.filter((item) => item.type==='sauce')} />
        <IngredientsGrid ingredientsType={data.filter((item) => item.type==='main')} />
      </div>
    )
  }
}

export default BurgerIngredients;