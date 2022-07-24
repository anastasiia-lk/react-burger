import { useState, useRef, useMemo, FC } from 'react';

import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import {INGREDIENT_PROP_TYPE, SCROLL_MARGIN} from '../../utils/data';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { Link, useLocation } from 'react-router-dom';

import {TPriceEl, TIngrCard, TIngrTypes, TIngrBlock} from './burger-ingredients.types'
import { useAppSelector } from '../../services/hooks';
import { IIngredient } from '../../services/types/data';

const PriceElement: FC<TPriceEl> = ({price}) => {
  return (
    <div className={`${burgerIngredientsStyles.price} mb-1 mt-1`}>
      <h3 className={`${burgerIngredientsStyles['price-element']} text text_type_digits-default`}>{price}</h3>
      <CurrencyIcon type="primary" />
    </div> 
  )
}

const IngredientCard: FC<TIngrCard> = ({ingredient}) => {
  const location = useLocation();

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
  });
  return (
    <div> {
    !isDrag && 
    <div ref={dragRef} className = {`${burgerIngredientsStyles.card}`}>
      <Link
        to={`/ingredients/${ingredient?._id}`}
        state={{ background: location }}
      >
      <div className={burgerIngredientsStyles.counter}>
        <Counter count={ingredient?.qty ? ingredient.qty : 0} size="default"/>
      </div>
      <div className = {burgerIngredientsStyles.image} style={{ backgroundImage: 'url(' + ingredient?.image + ')', backgroundSize: 'cover' }}>
      </div>
      <PriceElement price = {ingredient?.price} />
      <p className = {`${burgerIngredientsStyles.name} text text_type_main-default`}>
        {ingredient?.name}
      </p>
      </Link>
    </div>
}
  </div>
  )
}

const IngredientsGrid:FC<TIngrTypes> = ({ingredientsType}) => {
  return (
    <div className = {`${burgerIngredientsStyles['ingredients-grid']} mt-6 mb-10 ml-4 mr-4`}>
      {ingredientsType.map((ingredient) => {
        return (
        <div key={ingredient._id}>
          <IngredientCard ingredient = {ingredient} /> 
        </div>)
      })
      }
    </div>
  )
}

const IngredientsBlock:FC<TIngrBlock> = ({text, ingredientType, ingredients, typeRef}) => {
  return (
    <div>
    <h2 className="text text_type_main-medium mb-6" ref={typeRef}>
      {text}
    </h2>
    <IngredientsGrid ingredientsType={ingredients.filter((item) => item.type===ingredientType)}/>
    </div>
  )
}

const BurgerIngredients: FC = () => {
  const { ingredients } = useAppSelector(store => store.constructor);
  const [current, setCurrent] = useState('one');

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const scrollSection = (e: any) => {
      if (e === 'one') {
        return bunsRef
        } else { 
          if (e  === 'two') {
            return saucesRef
          } else { 
            if (e  === 'three') {
            return mainsRef
            }
        }
      }
  }

  const onClickHandler = (e: any) => {
    console.log(e)
    setCurrent(e);
    const curRef:any = scrollSection(e);
    curRef.current.scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
  };

  const handleOnScroll = (e: any) => {
    if ( e.target.firstChild.getBoundingClientRect().top - SCROLL_MARGIN < 0 && 
      e.target.firstChild.nextSibling.getBoundingClientRect().top - SCROLL_MARGIN < 0 && 
      e.target.lastChild.getBoundingClientRect().top - SCROLL_MARGIN < 0 ) 
      {
        setCurrent('three')
      } else {
        if ( e.target.firstChild.getBoundingClientRect().top - SCROLL_MARGIN < 0 && 
            e.target.firstChild.nextSibling.getBoundingClientRect().top - SCROLL_MARGIN < 0 ) 
            {
              setCurrent('two')
            } else {
                setCurrent('one')
              }
            }
    }
    return (
      <section className = {`${burgerIngredientsStyles.constructor}`}>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <div className = 'mb-10'>
          <div style={{ display: 'flex' }}>
            <Tab value="one" active={current === 'one'} onClick={onClickHandler}>
              Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={onClickHandler}>
              Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={onClickHandler}>
              Начинки
            </Tab>
          </div>
        </div>
        <div className = {`${burgerIngredientsStyles['ingredients-block']}`} onScroll={handleOnScroll}>
          <IngredientsBlock text = {'Булки'} ingredientType = {'bun'} ingredients = {ingredients} typeRef={bunsRef}/>
          <IngredientsBlock text = {'Соусы'} ingredientType = {'sauce'} ingredients = {ingredients} typeRef={saucesRef}/>
          <IngredientsBlock text = {'Начинки'} ingredientType = {'main'} ingredients = {ingredients} typeRef={mainsRef}/>
        </div>
      </section>
    )
}

export default BurgerIngredients;
