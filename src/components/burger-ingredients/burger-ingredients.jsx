import React from 'react';
import PropTypes from 'prop-types';
import {ingredientsPropTypes} from '../../utils/data';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientsSelector (){
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

function PriceElement ({price}){
  return (
    <div className={`${burgerIngredientsStyles.price} mb-1 mt-1`}>
      <h3 className={`${burgerIngredientsStyles['price-element']} text text_type_digits-default`}>{price}</h3>
      <CurrencyIcon type="primary" />
    </div> 
  )
}

function IngredientCard ({ ingredient, openModal }) {

  return (
    <div className = {`${burgerIngredientsStyles.card}`} onClick={() => openModal(ingredient)}>
      <div className={burgerIngredientsStyles.counter}>
        <Counter count={1} size="default"/>
      </div>
      <div className = {burgerIngredientsStyles.image} style={{ backgroundImage: 'url(' + ingredient.image + ')', backgroundSize: 'cover' }}>
      </div>
      <PriceElement price = {ingredient.price} />
      <p className = {`${burgerIngredientsStyles.name} text text_type_main-default`}>
        {ingredient.name}
      </p>
    </div>
  )
}

function IngredientsGrid ({ingredientsType, openModal}) {
  return (
    <div className = {`${burgerIngredientsStyles['ingredients-grid']} mt-6 mb-10 ml-4 mr-4`}>
      {ingredientsType.map((ingredient) => {
        return <IngredientCard ingredient = {ingredient} key={ingredient._id} openModal={openModal} />
      })
      }
    </div>
  )
}

function IngredientsBlock ({text, ingredientType, ingredients, openModal}) {
  return (
    <div>
    <h2 className="text text_type_main-medium mb-6">
      {text}
    </h2>
    <IngredientsGrid ingredientsType={ingredients.filter((item) => item.type===ingredientType)} openModal = {openModal}/>
    </div>
  )
}

function BurgerIngredients ({ingredients, openModal}) {
    return (
      <section className = {`${burgerIngredientsStyles.constructor}`}>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <div className = 'mb-10'>
          <IngredientsSelector />
        </div>
        <div className = {`${burgerIngredientsStyles['ingredients-block']}`}>
          <IngredientsBlock text = {'Булки'} ingredientType = {'bun'} ingredients = {ingredients} openModal = {openModal}/>
          <IngredientsBlock text = {'Соусы'} ingredientType = {'sauce'} ingredients = {ingredients} openModal = {openModal}/>
          <IngredientsBlock text = {'Начинки'} ingredientType = {'main'} ingredients = {ingredients} openModal = {openModal}/>
        </div>
      </section>
    )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object(ingredientsPropTypes.isRequired)),
  openModal: PropTypes.func
}

IngredientsBlock.propTypes = {
  text: PropTypes.string,
  ingredientType: PropTypes.string
}

export default BurgerIngredients;