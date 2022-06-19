import React from 'react';

import FeedConstructor from '../components/feed-constructor/feed-constructor';

import feedStyles from './feed.module.css';

export function Feed() {
  return (
    <div className={`${feedStyles.container} pl-5 pr-5`}>
      <h2 className='text text_type_main-large mb-5'>
        Лента заказов
      </h2>
      <FeedConstructor />
    </div>
  );
}