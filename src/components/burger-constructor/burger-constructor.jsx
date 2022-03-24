import {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {INGREDIENT_PROP_TYPE} from '../../utils/data';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {APIContext, TotalPriceContext, AddsIngredientsContext, BunsIngredientsContext} from '../../services/appContext';

function BurgerComponents ({bunsIngredients, addsIngredients}) {
  return (
    <div className = {`${burgerConstructorStyles.block} pt-25`}>
      <div className="ml-6">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bunsIngredients.name} (верх)`}
          price={bunsIngredients.price}
          thumbnail={bunsIngredients.image}
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
          text={`${bunsIngredients.name} (низ)`}
          price={bunsIngredients.price}
          thumbnail={bunsIngredients.image}
        />
      </div>
  </div>
  )
}

function BurgerConstructor ({openModal}) {
  const ingredients = useContext(APIContext);
  const {totalPriceState} = useContext(TotalPriceContext);
  const { totalPriceDispatcher } = useContext(TotalPriceContext);

  const {addsIngredients} = useContext(AddsIngredientsContext);
  const { setAddsIngredients } = useContext(AddsIngredientsContext);

  const {bunsIngredients} = useContext(BunsIngredientsContext);
  const { setBunsIngredients } = useContext(BunsIngredientsContext);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const currentAdds = ingredients.filter((item) => item.type === 'bun');
  const currentBuns = ingredients[0];

  useEffect(()=>{
    // setAddsIngredients({...addsIngredients, data: currentAdds});
    // setBunsIngredients({...bunsIngredients, data: currentBuns});
    updateTotalPrice();
  }, [totalPriceState.totalPrice]);

  const updateTotalPrice = () => {
    const currentAddsPrice = currentAdds.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
    const currentBunsPrice = currentBuns.price * 2;
    const currentTotalPrice = currentAddsPrice + currentBunsPrice;
    // setSelectedIngredients(currentAdds);
    totalPriceDispatcher({type: 'set', totalPrice: currentTotalPrice});
    setAddsIngredients({...addsIngredients, data: currentAdds});
    setBunsIngredients({...bunsIngredients, data: currentBuns});
  }

    return (
      <section>
        <BurgerComponents bunsIngredients={currentBuns} addsIngredients={currentAdds}/>
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
        {console.log(bunsIngredients, addsIngredients)}
      </section>
    )
  }

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(INGREDIENT_PROP_TYPE.isRequired),
  openModal: PropTypes.func
}

export default BurgerConstructor;
