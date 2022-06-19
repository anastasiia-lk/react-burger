import ordersNumbersList from './orders-numbers-list.module.css';

export default function OrdersNumbersList({ title, orders }) {
  return (
    <div>
    <h2 className={'text text_type_main-medium mb-6'}>
    {title}
  </h2>
  <ul className={`${ordersNumbersList['number-list']} list`}>
  {orders &&
      orders.map((item, index) => (
        <li
          className={`
            ${ordersNumbersList.number}
            ${ordersNumbersList['number_type_success']}
            text 
            text_type_digits-default
            mb-2`
          }
          key={index}
        >
          {item.toString().padStart(6, '0')}
        </li>
      ))}
  </ul>
  </div>
  );
}