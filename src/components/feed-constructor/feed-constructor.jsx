import feedConstructorStyles from './feed-constructor.module.css';
import {Link, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux';

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
                <li>
                  <Link
                  to={`/feed/${order._id}`}
                  state={{ background: location }}
                  className={feedConstructorStyles.link}
                  >
                    {/* <OrderCard /> */}
                  </Link>
                </li>
              )
            })}
          </ul>
      </section>
    </div>
  )
}