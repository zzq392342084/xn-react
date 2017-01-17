import React from 'react';
import {Link} from 'react-router';
import UserMenu from '../UserMenu/userMenu.component';
import './header.css';
import logoImage from '../../assets/svgs/logo.svg';

const Header = React.createClass({
  render() {
    return (
      <div className="layout-header">
        <Link to="/">
          <img src={logoImage} style={{width: 43, marginLeft: 5}}/>
        </Link>
        <UserMenu />
      </div>
    );
  }
});

export default Header;
