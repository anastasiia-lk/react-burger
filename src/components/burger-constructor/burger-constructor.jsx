import { useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useDrop, useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { ADD_DRAGGED_INGREDIENTS, ADD_INGREDIENT_COUNTER, REMOVE_INGREDIENT_COUNTER, REMOVE_DRAGGED_INGREDIENTS, UPDATE_BUN_INGREDIENT, ADD_BUN_COUNTER, BURGER_REPLACE_INGREDIENTS, addIngredient } from '../../services/actions/index';

function BurgerConstructor({ openModal }) {
  const dispatch = useDispatch();
  const { draggedIngredients } = useSelector(store => store.constructor);

  // const updateTotalPrice = useMemo(
  //   () => {
  //     const currentTotalPrice = draggedIngredients.map(item => item.type === 'bun' ? item.price * 2 : item.price).reduce((prev, curr) => prev + curr, 0)
  //     return currentTotalPrice
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
    // dispatch({
    //   type: ADD_DRAGGED_INGREDIENTS,
    //   value: ingredient
    // });
    dispatch(addIngredient(ingredient));
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

  const IngredientCard = ({ index, children, item }) => {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [{ isDragging }, dragRef] = useDrag({
      type: "burger-item",
      item: () => ({ item, index }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    });
    const [{ isOver }, dropRef] = useDrop({
      accept: "burger-item",
      collect: (monitor) => ({
        isOver: monitor.isOver()
      }),
      drop: (item) => {
        if (item.index === index) return;
        dispatch({
          type: BURGER_REPLACE_INGREDIENTS,
          selected: item.index,
          target: index
        });
        console.log(draggedIngredients);
      },
    })

    if (item.type !== "bun") {
      dragRef(dropRef(ref));
    };

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
      <div ref={ref} onClick={handleClick} draggable>
        {children}
      </div>
    )
  }
  return (
    <section>
      <div ref={dropTarget} className={`${burgerConstructorStyles.block} pt-25`}>
        {draggedIngredients && draggedIngredients.map(item =>
          item.type === 'bun' &&
          <div className="ml-6 mb-4" key={item.key}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${item.name} (верх)`}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        )}
        <div className={burgerConstructorStyles.list}>
          {draggedIngredients && draggedIngredients.map((item, index) =>
            item.type !== 'bun' &&
            <IngredientCard item={item} index={item.index} key={item.key}>
              <div className={`${burgerConstructorStyles['list-item']} mb-4`}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={`${item.name}`}
                  price={`${item.price}`}
                  thumbnail={`${item.image}`}
                />
              </div>
            </IngredientCard>
          )}
        </div>
        {draggedIngredients && draggedIngredients.map(item =>
          item.type === 'bun' &&
          <div className="ml-6" key={item.key}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${item.name} (низ)`}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
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

export default BurgerConstructor;
