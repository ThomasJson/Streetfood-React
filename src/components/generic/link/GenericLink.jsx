import React from 'react';
import './GenericLink.scss';
import { NavLink } from 'react-router-dom';

const GenericLink = ({to, onClick, className, children}) => {
  return (
    <>
      {to ?
      <>
        <NavLink
        to={to}
        className={isActive => `custom-link ${typeof className === 'function' ? className(isActive) : className}`}
        onClick={onClick}>
          {children}
        </NavLink>
      </>
      :
      <>
        <span className={`custom-link cursor-pointer pe-auto ${className}`} onClick={onClick}>{children}</span>
      </>
      }
    </>
  );
};

export default GenericLink;