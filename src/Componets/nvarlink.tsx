import React from 'react';
import {NavLink} from 'react-router-dom';

function NvarLink(props:{
  Url: string;
  Title: string;
}) {
  return (
    <div>
      <div className="">
        <NavLink to={props.Url}>
          <p className="fw-bold navlink text-white ">{props.Title}</p>
        </NavLink>
      </div>
    </div>
  );
}

export default NvarLink;
