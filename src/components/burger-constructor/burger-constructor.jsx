import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerComponents = ({ingredients}) => {
  const addsIngredients = ingredients.filter((item) => item.type !== 'bun')
  return (
    <div className = {`${burgerConstructorStyles.block} pt-25`}>
      <div className="ml-6">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${ingredients[0].name} (верх)`}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image}
        />
      </div>
      <ul className={burgerConstructorStyles.list}>
        {addsIngredients.map((ingredient) => {
          return(
            <li key={ingredient._id} className={`${burgerConstructorStyles['list-item']} mb-4`}>
                <DragIcon type="primary"/>
                <ConstructorElement
                text={`${ingredient.name}`}
                price={`${ingredient.price}`}
                thumbnail={`${ingredient.image}`}
                />
            </li>
          )  
       })}
      </ul>
      <div className="ml-6">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${ingredients[0].name} (низ)`}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image}
        />
      </div>
  </div>
  )
}

const BurgerConstructor = ({ingredients}) => {
    return (
      <section>
        <BurgerComponents ingredients={ingredients}/>
        <div className={`${burgerConstructorStyles.total} mt-10 mr-4`}>
          <div className={`${burgerConstructorStyles.price} mr-10`}>
            <p className="text text_type_digits-medium mr-2">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    )
  }

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object)
}

export default BurgerConstructor;
