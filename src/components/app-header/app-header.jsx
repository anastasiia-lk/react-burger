import appHeaderStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

function AppHeader() {
    return (
      <header className = {appHeaderStyles.header}>
        <nav className = {appHeaderStyles.menu}>
          <ul className = {appHeaderStyles.list}>
          <NavLink to="/" className={appHeaderStyles.link}>
            <li className={`${appHeaderStyles['header-item']} ml-0 mr-2 mb-4 mt-4 pl-5 pr-5 pb-4 pt-4`}>
              <div className="ml-0 mr-2 mb-0 mt-0">
                <BurgerIcon type="primary"/>
              </div>
              <p className="text text_type_main-default">
                Конструктор
              </p>
            </li>
            </NavLink>
            <li className={`${appHeaderStyles['header-item']} ml-0 mr-0 mb-4 mt-4 pl-5 pr-5 pb-4 pt-4`}>
              <div className="ml-0 mr-2 mb-0 mt-0">
                <ListIcon type="primary"/>
              </div>
              <p className="text text_type_main-default">
                Лента заказов
              </p>
            </li>
          </ul>
        </nav>  
        <Logo />
        <div className={`${appHeaderStyles['header-item']} ml-0 mr-0 mb-4 mt-4 pl-5 pr-5 pb-4 pt-4`}>
        <NavLink to="/profile" className={appHeaderStyles.link}>
          <div className="ml-0 mr-2 mb-0 mt-0">
            <ProfileIcon type="primary"/>
          </div>
          <p className="text text_type_main-default">
            Личный кабинет
          </p>
        </NavLink>
        </div>  
      </header>
    )
  }

export default AppHeader;
