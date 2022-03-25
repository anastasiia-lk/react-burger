import {useContext, useMemo} from 'react';
import PropTypes from 'prop-types';
import {INGREDIENT_PROP_TYPE} from '../../utils/data';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {APIContext} from '../../services/appContext';

function BurgerComponents ({buns, adds}) {
  return (
    <div className = {`${burgerConstructorStyles.block} pt-25`}>
      <div className="ml-6">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${buns.name} (верх)`}
          price={buns.price}
          thumbnail={buns.image}
        />
      </div>
      <ul className={burgerConstructorStyles.list}>
        {adds.map((ingredient) => {
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
          text={`${buns.name} (низ)`}
          price={buns.price}
          thumbnail={buns.image}
        />
      </div>
  </div>
  )
}

function BurgerConstructor ({openModal, adds, buns}) {
  const ingredients = useContext(APIContext);

  const updateTotalPrice = useMemo(
    () => {
    const currentAddsPrice = adds.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
    const currentBunsPrice = buns.price * 2;
    const currentTotalPrice = currentAddsPrice + currentBunsPrice;
    return currentTotalPrice
    },
    [adds, buns]
  );

    return (
      <section>
        <BurgerComponents buns={buns} adds={adds}/>
        <div className={`${burgerConstructorStyles.total} mt-10 mr-4`}>
          <div className={`${burgerConstructorStyles.price} mr-10`}>
            <p className="text text_type_digits-medium mr-2">{updateTotalPrice}</p>
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
  openModal: PropTypes.func
}

BurgerComponents.propTypes = {
  buns: INGREDIENT_PROP_TYPE.isRequired,
  adds: PropTypes.arrayOf(INGREDIENT_PROP_TYPE.isRequired)
}

export default BurgerConstructor;
