import {useContext, useMemo, useEffect, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import {INGREDIENT_PROP_TYPE} from '../../utils/data';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {APIContext} from '../../services/appContext';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {ADD_DRAGGED_INGREDIENTS, INIT_DRAGGED_INGREDIENTS, ADD_INGREDIENT_COUNTER, REMOVE_INGREDIENT_COUNTER, REMOVE_DRAGGED_INGREDIENTS, UPDATE_BUN_INGREDIENT, ADD_BUN_COUNTER, REMOVE_BUN_COUNTER, UPDATE_DRAGGED_INGREDIENTS} from '../../services/actions/index';

function BurgerConstructor ({openModal}) {
  const dispatch = useDispatch();
  const {ingredients, draggedIngredients} = useSelector(store => store.constructor);

  // const updateTotalPrice = useMemo(
  //   () => { 
  //   const currentTotalPrice = draggedIngredients.map(item => item.type === 'bun' ? item.price*2 : item.price).reduce((prev, curr) => prev + curr, 0)
  //   return currentTotalPrice
  //   },
  //   [draggedIngredients]
  // );

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
      })
    }
      dispatch({
        type: ADD_DRAGGED_INGREDIENTS,
        value: ingredient
      });
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
        const moveDraggedIngredients = useCallback(
          (dragIndex, hoverIndex) => {
            const dragItem = draggedIngredients[dragIndex-1];
            // console.log(dragItem);
            const hoverItem = draggedIngredients[hoverIndex-1];
            // console.log(hoverItem);
            // console.log(draggedIngredients);
            
            const updatedDraggedIngredients = [...draggedIngredients];
            updatedDraggedIngredients[dragIndex-1] = hoverItem;
            updatedDraggedIngredients[hoverIndex-1] = dragItem;
            // console.log(updatedDraggedIngredients);
            // dispatch({
            //   type: UPDATE_DRAGGED_INGREDIENTS,
            //   value: updatedDraggedIngredients
            // })
            return updatedDraggedIngredients
          },
[dispatch, draggedIngredients]
)
  
  const IngredientCard = ({index, children, moveDraggedIngredients, item}) => {
    const dispatch = useDispatch();
    const {draggedIngredients} = useSelector(store => store.constructor);
    const [{ isDragging }, dragRef] = useDrag({
      type: "item",
      item: { index },
      collect: monitor => ({
          isDragging: monitor.isDragging(),
      })
    });
    const [{isHover}, dropRef] = useDrop({
      accept: 'item',
      hover: (item, monitor) => {
        console.log(item);
        const dragIndex = item.index;
        console.log(`dragIndex ${dragIndex}`);
        const hoverIndex = index;
        console.log(`hoverIndex ${hoverIndex}`);
        // console.log(`ref.current ${ref.current}`);
        // const hoverBoundingRect = ref.current?.getBoundingClientRect()
        // console.log(`hoverBoundingRect ${hoverBoundingRect}`);
        // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // console.log(`hoverMiddleY ${hoverMiddleY}`);
        // const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;
        // console.log(`hoverActualY ${hoverActualY}`);

        // if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
        // if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

        const updatedDraggedIngredients = moveDraggedIngredients(dragIndex, hoverIndex);
        console.log(updatedDraggedIngredients);
        console.log(draggedIngredients);
        // item.index = hoverIndex;
      },
    })

    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));
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
      <div ref={dragDropRef} onClick={handleClick}>
        {children}
      </div>
    )
  }
    return (
      <section>
        <div ref={dropTarget} className = {`${burgerConstructorStyles.block} pt-25`}>
        {/* { draggedIngredients && draggedIngredients.map(item => 
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
         )} */}
          <div className={burgerConstructorStyles.list}>
         { draggedIngredients && draggedIngredients.map((item, index) => 
         item.type !== 'bun' &&
         <IngredientCard item={item} index={item.index} moveDraggedIngredients={moveDraggedIngredients} key={`${item.name}_${index}`}>
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
        {/* { draggedIngredients && draggedIngredients.map(item => 
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
         )} */}
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
