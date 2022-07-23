import { useMemo, useRef, useCallback, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useDrop, useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { increaseIngredientCounter, decreaseIngredientCounter, removeIngredient, updateBun, increaseBunCounter, sortConstructorIngredients, addIngredient } from '../../services/actions/index';

import {getCookie} from '../../utils/utils'

import {sendOrder} from '../../services/thunks/order'

import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { IIngredient } from '../../services/types/data';
import {IBurgerConstructorIngredientCard} from './burger-constructor.types'
import {addIngredientThunk} from '../../services/thunks/constructor'

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { draggedIngredients } = useAppSelector(store => store.constructor);
  const { isAuth } = useAppSelector((store) => store.user);

  const updateTotalPrice = useMemo(
    () => {
      let orderBtnStatus = false;
      const currentTotalPrice = draggedIngredients.map(item => item.type === 'bun' ? item.price * 2 : item.price).reduce((prev, curr) => prev + curr, 0);
      currentTotalPrice !== 0 ? orderBtnStatus = false : orderBtnStatus = true;
      return [currentTotalPrice, orderBtnStatus]
    },
    [draggedIngredients]
  );

  const onClickHandler = useCallback(() => {
    if (isAuth) {
      const accessToken = `Bearer ${getCookie('token')}`
      const ids = [
        ...draggedIngredients.map((item) => item._id),
      ];
      dispatch(sendOrder(ids, accessToken));
    } else {
      navigate('/login');
    }
  }, [draggedIngredients, dispatch, isAuth, navigate]);

  const onDropHandler = (ingredient: IIngredient) => {
    if (ingredient.type === 'bun') {
      dispatch(updateBun(ingredient));
      dispatch(increaseBunCounter(ingredient));
    } else {
      // dispatch(increaseIngredientCounter(ingredient))
      // dispatch(increaseIngredientCounter(ingredient))
    }
    dispatch(addIngredientThunk(ingredient));
  }
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient: any) {
      onDropHandler(ingredient);
    }
  });

  const IngredientCard: FC<IBurgerConstructorIngredientCard> = ({ index, children, item })=> {
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
      drop: (item: any) => {
        if (item.index === index) return;
          dispatch(sortConstructorIngredients(item.index, index));
      },
    })

    if (item?.type !== "bun") {
      dragRef(dropRef(ref));
    };

    const handleClick = (e: any) => {
      if (e.target.parentNode.parentNode.className.includes('action')) {
        dispatch(decreaseIngredientCounter(item!));
        dispatch(removeIngredient(item!));
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
            <IngredientCard item={item} index={ draggedIngredients.indexOf(item)} key={item.key}>
              <div className={`${burgerConstructorStyles['list-item']} mb-4`}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={`${item.name}`}
                  price={item.price}
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
            <p className="text text_type_digits-medium mr-2">{updateTotalPrice[0]}</p>
            <CurrencyIcon type="primary" />
          </div>
          <div onClick={onClickHandler}>
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
