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

const PriceElement = ({price}) => {
  return (
    <div className={`${burgerIngredientsStyles.price} mb-1 mt-1`}>
      <p className={`${burgerIngredientsStyles.price__element} text text_type_digits-default`}>{price}</p>
      <CurrencyIcon type="primary" />
    </div> 
  )
}

const IngredientCard = ({ ingredient }) => {
  return (
    <div className = {`${burgerIngredientsStyles.card}`}>
      <div className = {burgerIngredientsStyles.image} style={{ backgroundImage: 'url(' + ingredient.image + ')', backgroundSize: 'cover' }}>
      </div>
      <PriceElement price = {ingredient.price} />
      <p className = {`${burgerIngredientsStyles.name} text text_type_main-default`}>
        {ingredient.name}
      </p>
    </div>
  )
}

const IngredientsGrid = ({ingredientsType}) => {
  return (
    <div className = {`${burgerIngredientsStyles.ingredientsGrid} mt-6 mb-10 ml-4 mr-4`}>
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