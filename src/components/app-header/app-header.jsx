import appHeaderStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link } from 'react-router-dom';

function AppHeader() {
    return (
      <header className = {appHeaderStyles.header}>
        <nav className = {appHeaderStyles.menu}>
          <ul className = {appHeaderStyles.list}>
          <li className={`${appHeaderStyles['list-item']} mt-4 mb-4 pt-4', 'pb-4 pl-5 pr-5`}>
          <NavLink to="/" className={appHeaderStyles.link}>
          {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                  <span
                    className={`${!isActive && 'text_color_inactive'} text text_type_main-default ml-2`}
                  >
                    Конструктор
                  </span>
                </>
              )}
            </NavLink>
            </li>
            <li className={`${appHeaderStyles['list-item']} mt-4 mb-4 pt-4', 'pb-4 pl-5 pr-5`}>
            <NavLink to="/orders" className={appHeaderStyles.link}>
            {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? 'primary' : 'secondary'} />
                  <span
                    className={`${!isActive && 'text_color_inactive'} text text_type_main-default ml-2`}
                  >
                    Лента заказов
                  </span>
                </>
              )}
              </NavLink>
            </li>
        <li className={`${appHeaderStyles['list-item']}`}>
        <Link to="/" className={appHeaderStyles.link}>
        <Logo />
        </Link>
        </li>
        <li className={`${appHeaderStyles['list-item']} mt-4 mb-4 pt-4', 'pb-4 pl-5 pr-5`}>
        <div className={`${appHeaderStyles['header-item']} ml-0 mr-0 mb-4 mt-4 pl-5 pr-5 pb-4 pt-4`}>
        <NavLink to="/profile" className={appHeaderStyles.link}>
        {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                  <span
                   className={`${!isActive && 'text_color_inactive'} text text_type_main-default ml-2`}
                  >
                    Личный кабинет
                  </span>
                </>
              )}
        </NavLink>
        </div>
        </li>
        </ul>
        </nav> 
      </header>
    )
  }

export default AppHeader;
