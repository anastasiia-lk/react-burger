import { useMemo, FC } from 'react';

import ingredientImgStyles from './ingredient-image.module.css';

import { IIngredientImgProps } from './ingredient-image.types';

const IngredientImg: FC<IIngredientImgProps> = ({
  imageUrl,
  index,
  count,
  position = 'absolute',
}) => {
  const ingredientIconStyle = useMemo(
    () =>
      position === 'absolute' && typeof index !== 'undefined'
        ? { position, zIndex: `${10 - index}`, left: `${index * 48}px` }
        : { position },
    [index, position]
  );

  return (
    <div style={ingredientIconStyle} className={ingredientImgStyles['ingredient-img']}>
      <div className={ingredientImgStyles.border} />
      <div
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
        className={ingredientImgStyles.image}
      />
      {index === 5 && typeof count !== 'undefined' && count > 0 && (
        <div className={ingredientImgStyles.overlay}>
          <span className='text text_type_main-small'>
            {`+${count}`}
          </span>
        </div>
      )}
    </div>
  );
}

export default IngredientImg;