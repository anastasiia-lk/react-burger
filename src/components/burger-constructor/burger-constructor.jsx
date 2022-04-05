import {useContext, useMemo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {INGREDIENT_PROP_TYPE} from '../../utils/data';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {APIContext} from '../../services/appContext';
import { useDrop } from 'react-dnd';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {ADD_DRAGGED_INGREDIENTS, INIT_DRAGGED_INGREDIENTS, ADD_INGREDIENT_COUNTER, REMOVE_INGREDIENT_COUNTER, REMOVE_DRAGGED_INGREDIENTS, UPDATE_BUN_INGREDIENT, ADD_BUN_COUNTER, REMOVE_BUN_COUNTER} from '../../services/actions/index';

// const BurgerComponents = ({children, onDropHandler}) => {
//   const dispatch = useDispatch();
//   const ingredients = useSelector(state => state.ingredients);
//   const [, dropTarget] = useDrop({
//     accept: 'ingredient',
//     drop(itemId) {
//       dispatch({
//           type: ADD_DRAGGED_INGREDIENTS,
//           ...itemId
//       });
//   }
//   })
//   return (
//     <div ref={dropTarget} className = {`${burgerConstructorStyles.block} pt-25`}>
//       {children}
//     </div>
//   )
// }

function BurgerConstructor ({openModal}) {
   
  // const updateTotalPrice = useMemo(
  //   () => {
  //   let currentTotalPrice;
  //   if (draggedIngredients === []) {
  //     currentTotalPrice = 0  
  //   } else {
  //   currentTotalPrice = draggedIngredients.map(item => item.price).reduce((prev, curr) => prev + curr, 0)
  //   }
  //   return currentTotalPrice
  //   },
  //   [draggedIngredients]
  // );
  const dispatch = useDispatch();
  const {ingredients, draggedIngredients} = useSelector(store => store.constructor);
  const onDropHandler = (ingredient) => {
    if (ingredient.type === 'bun') {
      dispatch({
        type: UPDATE_BUN_INGREDIENT,
        value: ingredient
      });
      dispatch({
        type: ADD_BUN_COUNTER,
        value: ingredient
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT_COUNTER,
        value: ingredient
      }); 
    }
      dispatch({
        type: ADD_DRAGGED_INGREDIENTS,
        value: ingredient
      });
      // dispatch({
      //   type: ADD_INGREDIENT_COUNTER,
      //   value: ingredient
      // });
  }
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver(),
  }),
    drop(ingredient) {
      onDropHandler(ingredient);
    }
  });
  
  const IngredientCard = ({item, children}) => {
    const handleClick = (e) => {
    if (e.target.parentNode.parentNode.className.includes('action')) {
      dispatch({
        type: REMOVE_INGREDIENT_COUNTER,
        value: item
      });
      dispatch({
        type: REMOVE_DRAGGED_INGREDIENTS,
        value: item
      });
    }
    }
    return (
      <div onClick={handleClick}>
        {children}
      </div>
    )
  }
    return (
      <section>
        <div ref={dropTarget} className = {`${burgerConstructorStyles.block} pt-25`}>
        { draggedIngredients && draggedIngredients.map(item => 
         item.type === 'bun' && 
         <IngredientCard key={item.key} item={item}>
           <div className="ml-6 mb-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${item.name} (верх)`}
            price={item.price}
            thumbnail={item.image}
          />
        </div>
         </IngredientCard>
         )}
          <div className={burgerConstructorStyles.list}>
         { draggedIngredients && draggedIngredients.map(item => 
         item.type !== 'bun' &&
         <IngredientCard key={item.key} item={item}>
           <div className={`${burgerConstructorStyles['list-item']} mb-4`}>
           <DragIcon type="primary"/>
           <ConstructorElement
            text={`${item.name}`}
            price={`${item.price}`}
            thumbnail={`${item.image}`}
          />
          </div>
         </IngredientCard>
         )}
         </div>
        { draggedIngredients && draggedIngredients.map(item => 
         item.type === 'bun' && 
         <IngredientCard key={item.key} item={item}>
           <div className="ml-6">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${item.name} (низ)`}
          price={item.price}
          thumbnail={item.image}
        />
      </div>
         </IngredientCard>
         )}
        <div className={`${burgerConstructorStyles.total} mt-10 mr-4`}>
          <div className={`${burgerConstructorStyles.price} mr-10`}>
            {/* <p className="text text_type_digits-medium mr-2">{updateTotalPrice}</p> */}
            <CurrencyIcon type="primary" />
          </div>
          <div onClick={openModal}>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
          </div>
          </div>
        </div>
      </section>
    )
  }

BurgerConstructor.propTypes = {
  openModal: PropTypes.func
}

// BurgerComponents.propTypes = {
//   buns: INGREDIENT_PROP_TYPE.isRequired,
//   adds: PropTypes.arrayOf(INGREDIENT_PROP_TYPE.isRequired)
// }

export default BurgerConstructor;
