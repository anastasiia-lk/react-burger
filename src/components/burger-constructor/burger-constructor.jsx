import {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {INGREDIENT_PROP_TYPE} from '../../utils/data';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {APIContext, TotalPriceContext} from '../../services/appContext';

function BurgerComponents ({ingredients, addsIngredients}) {
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

function BurgerConstructor ({openModal}) {
  const ingredients = useContext(APIContext);
  const {totalPriceState} = useContext(TotalPriceContext);
  const { totalPriceDispatcher } = useContext(TotalPriceContext);

  const [addsIngredients, setAddsIngredients] = useState([]);

  const currentIngredients = ingredients.filter((item) => item.type !== 'bun');
  const currentTotalPrice = addsIngredients.map(item => item.price).reduce((prev, curr) => prev + curr, 0);

  useEffect(()=>{
    updateTotalPrice();
  }, [currentTotalPrice]);

  const updateTotalPrice = () => {
    setAddsIngredients(currentIngredients);
    totalPriceDispatcher({type: 'set', totalPrice: currentTotalPrice});
  }

    return (
      <section>
        <BurgerComponents ingredients={ingredients} addsIngredients={addsIngredients}/>
        <div className={`${burgerConstructorStyles.total} mt-10 mr-4`}>
          <div className={`${burgerConstructorStyles.price} mr-10`}>
            <p className="text text_type_digits-medium mr-2">{totalPriceState.totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <div onClick={openModal}>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
          </div>
        </div>
      </section>
    )
  }

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(INGREDIENT_PROP_TYPE.isRequired),
  openModal: PropTypes.func
}

export default BurgerConstructor;
