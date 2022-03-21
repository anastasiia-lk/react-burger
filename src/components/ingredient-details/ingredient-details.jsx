import ingredientStyles from './ingredient-details.module.css';

function IngredientDetails ({ingredient}) {
  function openModalOverlay() {

  }

  function closeModalOverlay() {

  }

  const CaptionBlock = ({caption, content}) => {
    return(
    <div className={ingredientStyles['caption-block']}>
      <p className = 'text text_type_main-default mb-2'>{caption}</p>
      <p className = 'text text_type_digits-default'>{content}</p>
    </div>
    )
  }

  const Caption = ({ingredient}) => {
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
      <img src={ingredient.image} alt={`${ingredient.name}`} className={`${ingredientStyles.image} mb-4`}/>
      <h3 className={'text text_type_main-medium mb-8'}>
      {ingredient.name}
      </h3>
      <Caption ingredient = {ingredient} className={'mb-15'}/>
    </div>
    </>
  )
}

export default IngredientDetails;