import ingredientStyles from './ingredient-details.module.css';
import {INGREDIENT_PROP_TYPE} from '../../utils/data';

import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

function IngredientDetails ({ isModal = false }) {
  const { id } = useParams();

  const { ingredients } = useSelector(store => store.constructor);

  const [ingredient] = ingredients.filter(
    (ingredient) => ingredient._id === id
  );

  const CaptionBlock = ({caption, content}) => {
    return(
    <div className={ingredientStyles['caption-block']}>
      <p className = 'text text_type_main-default mb-2'>{caption}</p>
      <p className = 'text text_type_digits-default'>{content}</p>
    </div>
    )
  }

  const Caption = () => {
    return (
      <ul className = {`${ingredientStyles.caption}`}>
        <li className='mr-5'>
          <CaptionBlock caption='Калории,ккал' content={ingredient.calories}/>
        </li>
        <li className='mr-5'>
          <CaptionBlock caption='Белки, г' content={ingredient.proteins}/>
        </li>
        <li className='mr-5'>
          <CaptionBlock caption='Жиры, г' content={ingredient.fat}/>
        </li>
        <li>
          <CaptionBlock caption='Углеводы, г' content={ingredient.carbohydrates}/>
        </li>
      </ul>
    )
  }

  return (
    <>
    <div className={`${ingredientStyles.container}`}>
    {isModal && <h2 className = 'text text_type_main-large'>
        Детали ингредиента
      </h2>}
      <img src={ingredient.image} alt={`${ingredient.name}`} className={`${ingredientStyles.image} mb-4`}/>
      <h3 className={'text text_type_main-medium mb-8'}>
      {ingredient.name}
      </h3>
      <Caption className={'mb-15'}/>
    </div>
    </>
  )
}

IngredientDetails.propTypes = {
	ingredient: INGREDIENT_PROP_TYPE.isRequired,
}

export default IngredientDetails;
