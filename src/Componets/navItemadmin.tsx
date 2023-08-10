import React, {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function NavitemMenu() {
  return (
    <Link to="/">
      <div className="ItemsAdmin">
        <div className="">
          <p className="text-white">
            <span className="material-icons">fingerprint</span> Prueba
          </p>
        </div>
      </div>
    </Link>
  );
}

export default NavitemMenu;

NavitemMenu.propTypes = {
  name: PropTypes.string,
};
