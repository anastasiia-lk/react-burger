import totalOrdersStyles from './total-orders.module.css';

export default function TotalOrders({ title, totalOrders }) {
  return (
    <div>
    <h2 className='text text_type_main-medium'>
            {title}
          </h2>
          {title==='Выполнено за все время:' && <span
            className={`text text_type_digits-large`}
          >
            {totalOrders.toLocaleString()}
          </span>}
          {title==='Выполнено за сегодня:' && <span
            className={`${totalOrdersStyles.count} text text_type_digits-large`}
          >
            {totalOrders.toLocaleString()}
          </span>}
  </div>
  );
}