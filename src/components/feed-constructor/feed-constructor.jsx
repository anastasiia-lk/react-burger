import feedConstructorStyles from './feed-constructor.module.css';
import {Link, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import OrderCard from '../order-card/order-card';

export default function FeedConstructor() {
  // const dispatch = useDispatch();
  // const { orders } = useSelector(getOrders);
  const location = useLocation();


  return (
    <div className={feedConstructorStyles.container}>
      <section aria-label="Лента заказов"
        className={`${feedConstructorStyles.feed} custom-scroll`}>
          <ul className="list">
            {[1,2].map((order) => {
              return(
                <li className={feedConstructorStyles.orderContainer}>
                  <Link
                  to={`/feed/${order._id}`}
                  state={{ background: location }}
                  className={feedConstructorStyles.link}
                  >
                    <OrderCard />
                  </Link>
                </li>
              )
            })}
          </ul>
      </section>
      <section className={feedConstructorStyles.stats}>
      <div className={`${feedConstructorStyles['orders-board']} mb-15`}>
          <section className={feedConstructorStyles.done}>
            <h2 className={'text text_type_main-medium mb-6'}>
              Готовы:
            </h2>
            <ul className={`${feedConstructorStyles['number-list']} list`}>
              {
               [1,2].map((item) => (
                  <li
                    className={`
                      ${feedConstructorStyles.number}
                      ${feedConstructorStyles['number_type_success']}
                      text 
                      text_type_digits-default
                      mb-2`
                    }
                  >
                    1234567
                  </li>
                ))}
            </ul>
          </section>

          <section className={feedConstructorStyles['in-work']}>
            <h2 className='text text_type_main-medium mb-6'>
              В работе:
            </h2>
            <ul className="list">
              {
                [1,2].map((item) => (
                  <li
                    className={`
                      ${feedConstructorStyles.number}
                      text 
                      text_type_digits-default
                      mb-2`
                    }
                  >
                    1234567
                  </li>
                ))}
            </ul>
          </section>
        </div>

        <section className="mb-15">
          <h2 className='text text_type_main-medium'>
            Выполнено за все время:
          </h2>
          <span
            className={`${feedConstructorStyles.number} text text_type_digits-large`}
          >
            1234567
          </span>
        </section>

        <section className={feedConstructorStyles.today}>
          <h2 className='text text_type_main-medium'>
            Выполнено за сегодня:
          </h2>
          <span
            className={`${feedConstructorStyles.count} text text_type_digits-large`}
          >
             1234567
          </span>
        </section>
      </section>
    </div>
  )
}