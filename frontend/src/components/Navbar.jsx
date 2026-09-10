// import { Link } from "react-router-dom";

// function Navbar() {
//     return (
//         <nav className="navbar">

//             <div className="navbar-brand">
//                 PAIMANA AI
//             </div>

//             <div className="navbar-links">

//                 <Link to="/">
//                     Dashboard
//                 </Link>

//                 <Link to="/projects">
//                     Projects
//                 </Link>

//                 <Link to="/warnings">
//                     Warnings
//                 </Link>

//                 <Link to="/analytics">
//                     Analytics
//                 </Link>

//             </div>

//         </nav>
//     );
// }

// export default Navbar;




// import { NavLink } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="navbar">

//       <div className="navbar-brand">

//         <div>
//           <h2>🚀 PAIMANA AI</h2>
//           <span>Intelligent Project Monitoring</span>
//         </div>

//       </div>

//       <div className="navbar-links">

//         <NavLink to="/">
//           🏠 Dashboard
//         </NavLink>

//         <NavLink to="/projects">
//           📁 Projects
//         </NavLink>

//         <NavLink to="/analytics">
//           📊 Analytics
//         </NavLink>

//         <NavLink to="/warnings">
//           ⚠️ Warnings
//         </NavLink>

//       </div>

//     </nav>
//   );
// }

// export default Navbar;














// import { NavLink } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="navbar">

//       {/* BRAND */}

//       <div className="navbar-brand">

//         <div className="brand-icon">
//           🏗️
//         </div>

//         <div>
//           <div className="brand-title">
//             PAIMANA AI
//           </div>

//           <div className="brand-subtitle">
//             Project Intelligence Platform
//           </div>
//         </div>

//       </div>


//       {/* NAVIGATION */}

//       <div className="navbar-links">

//         <NavLink
//           to="/"
//           end
//           className={({ isActive }) =>
//             isActive
//               ? "nav-link active"
//               : "nav-link"
//           }
//         >
//           <span>🏠</span>
//           Dashboard
//         </NavLink>


//         <NavLink
//           to="/projects"
//           className={({ isActive }) =>
//             isActive
//               ? "nav-link active"
//               : "nav-link"
//           }
//         >
//           <span>📋</span>
//           Projects
//         </NavLink>


//         <NavLink
//           to="/analytics"
//           className={({ isActive }) =>
//             isActive
//               ? "nav-link active"
//               : "nav-link"
//           }
//         >
//           <span>📊</span>
//           Analytics
//         </NavLink>


//         <NavLink
//           to="/warnings"
//           className={({ isActive }) =>
//             isActive
//               ? "nav-link active warning-nav"
//               : "nav-link warning-nav"
//           }
//         >
//           <span>🚨</span>
//           Warnings
//         </NavLink>

//       </div>


//       {/* RIGHT SIDE */}

//       <div className="navbar-status">

//         <span className="status-dot"></span>

//         <span>
//           AI System Online
//         </span>

//       </div>

//     </nav>
//   );
// }

// export default Navbar;








import { NavLink } from "react-router-dom";

function Navbar() {

  const getNavClass = ({ isActive }) =>
    isActive
      ? "nav-link active"
      : "nav-link";

  return (
    <header className="navbar">

      {/* LEFT SIDE */}
      <div className="navbar-brand">

        <div className="brand-logo">
          🏗️
        </div>

        <div className="brand-text">

          <div className="brand-title">
            PAIMANA AI
          </div>

          <div className="brand-subtitle">
            Project Intelligence Platform
          </div>

        </div>

      </div>


      {/* RIGHT SIDE NAVIGATION */}
      <nav className="navbar-links">

        <NavLink
          to="/"
          end
          className={getNavClass}
        >
          <span className="nav-icon">🏠</span>
          <span>Dashboard</span>
        </NavLink>


        <NavLink
          to="/projects"
          className={getNavClass}
        >
          <span className="nav-icon">📋</span>
          <span>Projects</span>
        </NavLink>


        <NavLink
          to="/analytics"
          className={getNavClass}
        >
          <span className="nav-icon">📊</span>
          <span>Analytics</span>
        </NavLink>


        <NavLink
          to="/warnings"
          className={({ isActive }) =>
            isActive
              ? "nav-link warning-link active"
              : "nav-link warning-link"
          }
        >
          <span className="nav-icon">🚨</span>
          <span>Warnings</span>
        </NavLink>

      </nav>


      {/* SYSTEM STATUS */}
      <div className="system-status">

        <span className="status-dot"></span>

        <span>
          AI System Online
        </span>

      </div>

    </header>
  );
}

export default Navbar;