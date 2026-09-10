// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";

// import Navbar from "./components/Navbar";

// import Dashboard from "./pages/Dashboard";
// import Projects from "./pages/Projects";
// import ProjectDetails from "./pages/ProjectDetails";
// import Analytics from "./pages/Analytics";
// import Warnings from "./pages/Warnings";
// import "./App.css";


// function App() {

//   return (

//     <BrowserRouter>

//       <Navbar />

//       <Routes>

//         <Route path="/" element={<Dashboard />} />

//         <Route
//           path="/projects"
//           element={<Projects />}
//         />

//         <Route
//           path="/projects/:projectCode"
//           element={<ProjectDetails />}
//         />

//         <Route
//           path="/analytics"
//           element={<Analytics />}
//         />

//         <Route
//           path="/warnings"
//           element={<Warnings />}
//         />

//       </Routes>

//     </BrowserRouter>

//   );
// }

// export default App;






















// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";

// import Dashboard from "./pages/Dashboard";
// import Projects from "./pages/Projects";
// import ProjectDetails from "./pages/ProjectDetails";
// import Analytics from "./pages/Analytics";
// import Warnings from "./pages/Warnings";

// import "./App.css";

// function App() {
//   return (
//     <BrowserRouter>

//       <div className="app">

//         <Navbar />

//         <main className="main-content">

//           <Routes>

//             <Route path="/" element={<Dashboard />} />

//             <Route
//               path="/projects"
//               element={<Projects />}
//             />

//             <Route
//               path="/projects/:projectCode"
//               element={<ProjectDetails />}
//             />

//             <Route
//               path="/analytics"
//               element={<Analytics />}
//             />

//             <Route
//               path="/warnings"
//               element={<Warnings />}
//             />

//           </Routes>

//         </main>

//         <footer className="footer">
//           PAIMANA AI • Intelligent Project Monitoring & Early Warning System
//         </footer>

//       </div>

//     </BrowserRouter>
//   );
// }

// export default App;













// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Dashboard from "./pages/Dashboard";
// import Projects from "./pages/Projects";
// import ProjectDetails from "./pages/ProjectDetails";
// import Analytics from "./pages/Analytics";
// import Warnings from "./pages/Warnings";

// import "./App.css";

// function App() {

//   return (

//     <BrowserRouter>

//       <div className="app">

//         <Routes>

//           <Route
//             path="/"
//             element={<Dashboard />}
//           />

//           <Route
//             path="/projects"
//             element={<Projects />}
//           />

//           <Route
//             path="/projects/:projectCode"
//             element={<ProjectDetails />}
//           />

//           <Route
//             path="/analytics"
//             element={<Analytics />}
//           />

//           <Route
//             path="/warnings"
//             element={<Warnings />}
//           />

//         </Routes>

//       </div>

//     </BrowserRouter>

//   );
// }

// export default App;












import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Analytics from "./pages/Analytics";
import Warnings from "./pages/Warnings";

import "./App.css";


function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <div className="app-layout">

        <Routes>

          {/* MAIN DASHBOARD */}

          <Route
            path="/"
            element={<Dashboard />}
          />


          {/* PROJECTS */}

          <Route
            path="/projects"
            element={<Projects />}
          />


          {/* PROJECT DETAILS */}

          <Route
            path="/projects/:projectCode"
            element={<ProjectDetails />}
          />


          {/* ANALYTICS */}

          <Route
            path="/analytics"
            element={<Analytics />}
          />


          {/* WARNINGS */}

          <Route
            path="/warnings"
            element={<Warnings />}
          />

        </Routes>

      </div>

    </BrowserRouter>

  );
}

export default App;