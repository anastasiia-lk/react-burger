import PropTypes from 'prop-types';

export const ESC_KEY = "Escape";
export const INGREDIENT_PROP_TYPE = PropTypes.shape({
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  proteins: PropTypes.number,
  type: PropTypes.string,
  __v: PropTypes.number,
  _id: PropTypes.string,
});
export const SERVICE_URL = 'https://norma.nomoreparties.space/api';
export const SCROLL_MARGIN = 340;
