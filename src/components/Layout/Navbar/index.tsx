import React from 'react';
import { logout, useGetAccountInfo } from '@elrondnetwork/dapp-core';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dAppName } from 'config';
import { routeNames } from 'routes';
import logo from '../../../assets/img/odin.svg';
import './index.scss';
import ConnectionModal from '../../ConnectionModal';

const Navbar = () => {
  const { address } = useGetAccountInfo();

  const handleLogout = () => {
    logout(routeNames.home);
  };

  const isLoggedIn = Boolean(address);

  // transparency-changing scroll
  let listener = null;
  const [scrollState, setScrollState] = React.useState('top');

  React.useEffect(() => {
    listener = document.addEventListener('scroll', e => {
      const scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 80) {
        if (scrollState !== 'amir') setScrollState('amir');
      } else {
        if (scrollState !== 'top') setScrollState('top');
      }
    });
    return () => {
      document.removeEventListener('scroll', listener);
    };
  }, [scrollState]);


  //
  const [connectionModalShow, setConnectModalShow] = React.useState<boolean>(false);

  return (
    <BsNavbar className={scrollState == 'top' ? 'px-4 py-3 custom-navbar' : 'px-4 py-3 custom-navbar custom-navbar-dark'} expand='sm' collapseOnSelect fixed='top' variant='dark'>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0 c-logo-container'
          to={routeNames.home}
        >
          <img src={logo} />
          <span className=''>{dAppName}</span>
        </Link>

        <BsNavbar.Toggle aria-controls='responsive-navbar-nav' />
        <BsNavbar.Collapse id='responsive-navbar-nav' className='nav-menu-wrap'>
          <Nav className='ml-auto'>
            {isLoggedIn ? (
              <NavItem className='auth-button gradient-button' onClick={handleLogout}>
                Disconnect
              </NavItem>
            ) : (
              <NavItem className='auth-button gradient-button' onClick={() => {setConnectModalShow(true);}}>
                Connect
              </NavItem>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </div>

      <ConnectionModal
        show={connectionModalShow}
        onHide={() => setConnectModalShow(false)}
      />
    </BsNavbar>
  );
};

export default Navbar;
