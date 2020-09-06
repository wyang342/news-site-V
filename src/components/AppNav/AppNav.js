import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'reactstrap';
import navItems from '../../config/Sections.json';

class AppNav extends Component {
  render() {
    return (
      <Navbar color="light">
        {navItems.map((navItem) =>
          <Link to={`/sections/${navItem.value}`} >
            { navItem.label }
          </Link>
        )}
      </Navbar>
    )
  }
}

export default AppNav;


// Functional solution:
// function AppNav() {
//   return (
//     <Navbar color="light">
//       {navItems.map((navItem) =>
//         <Link to={`/sections/${navItem.value}`} >
//           {navItem.label}
//         </Link>
//       )}
//     </Navbar>
//   );
// }
