import "./header.scss";
import Logo from "../../assets/images/logo_main_2.png";

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">
          <img src={Logo}/>
        </div>
        <nav className="header__menu">
          <ul role="list" className="header__menu__items">
            <li className="header__menu-item">Pricing</li>
            <li className="header__menu-item">Features</li>
            <li className="header__menu-item">Company</li>
            <li className="header__menu-item">Help</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
