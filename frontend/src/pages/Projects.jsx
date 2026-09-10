// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   getProjects,
//   searchProjects,
// } from "../services/api";

// function Projects() {

//   const [projects, setProjects] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);


//   const loadProjects = async () => {

//     try {

//       setLoading(true);

//       if (search.trim()) {

//         const result =
//           await searchProjects(search);

//         setProjects(
//           result.projects || []
//         );

//       } else {

//         const result =
//           await getProjects();

//         setProjects(
//           result.projects || []
//         );
//       }

//     } catch (error) {

//       console.error(
//         "Project loading error:",
//         error
//       );

//     } finally {

//       setLoading(false);

//     }
//   };


//   useEffect(() => {

//     loadProjects();

//   }, []);


//   const handleSearch = async (event) => {

//     event.preventDefault();

//     await loadProjects();

//   };


//   return (

//     <div className="page">

//       <div className="page-header">

//         <h1>Project Explorer</h1>

//         <p>
//           Search and monitor infrastructure projects
//         </p>

//       </div>


//       <form
//         className="search-box"
//         onSubmit={handleSearch}
//       >

//         <input
//           type="text"
//           placeholder="Search project name..."
//           value={search}
//           onChange={(event) =>
//             setSearch(event.target.value)
//           }
//         />

//         <button type="submit">
//           Search
//         </button>

//       </form>


//       {loading ? (

//         <div className="loading">
//           Loading projects...
//         </div>

//       ) : (

//         <div className="projects-grid">

//           {projects.map((project, index) => (

//             <Link
//               key={index}
//               to={`/projects/${encodeURIComponent(
//                 project.project_code
//               )}`}
//               className="project-card"
//             >

//               <h3>
//                 {project.project_name}
//               </h3>

//               <p>
//                 {project.state}
//               </p>

//               <p>
//                 {project.sector}
//               </p>

//               <div className="project-risk">

//                 <strong>
//                   Risk:{" "}
//                   {Number(
//                     project.risk_score || 0
//                   ).toFixed(1)}
//                 </strong>

//                 <span>
//                   {project.warning_priority}
//                 </span>

//               </div>

//             </Link>

//           ))}

//         </div>

//       )}

//     </div>
//   );
// }

// export default Projects;





import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  getProjects,
  searchProjects
} from "../services/api";


function Projects() {

  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState("");

  const [stateFilter, setStateFilter] = useState("ALL");

  const [sectorFilter, setSectorFilter] = useState("ALL");

  const [riskFilter, setRiskFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    loadProjects();

  }, []);


  const loadProjects = async () => {

    try {

      setLoading(true);

      const response = await getProjects();

      setProjects(response.projects || []);

      setError("");

    } catch (err) {

      console.error(err);

      setError(
        "Unable to load projects. Make sure FastAPI is running."
      );

    } finally {

      setLoading(false);

    }

  };


  const handleSearch = async () => {

    if (!search.trim()) {

      loadProjects();

      return;

    }

    try {

      setLoading(true);

      const response =
        await searchProjects(search);

      setProjects(response.projects || []);

    } catch (err) {

      console.error(err);

      setError("Search failed.");

    } finally {

      setLoading(false);

    }

  };


  const states = useMemo(() => {

    return [
      "ALL",
      ...new Set(
        projects
          .map((p) => p.state)
          .filter(Boolean)
      )
    ];

  }, [projects]);


  const sectors = useMemo(() => {

    return [
      "ALL",
      ...new Set(
        projects
          .map((p) => p.sector)
          .filter(Boolean)
      )
    ];

  }, [projects]);


  const getRisk = (score) => {

    const value = Number(score || 0);

    if (value >= 70)
      return "HIGH";

    if (value >= 40)
      return "MEDIUM";

    return "LOW";

  };


  const filteredProjects =
    projects.filter((project) => {

      const risk =
        getRisk(project.risk_score);

      const matchesState =
        stateFilter === "ALL" ||
        project.state === stateFilter;

      const matchesSector =
        sectorFilter === "ALL" ||
        project.sector === sectorFilter;

      const matchesRisk =
        riskFilter === "ALL" ||
        risk === riskFilter;

      return (
        matchesState &&
        matchesSector &&
        matchesRisk
      );

    });


  const resetFilters = () => {

    setSearch("");
    setStateFilter("ALL");
    setSectorFilter("ALL");
    setRiskFilter("ALL");

    loadProjects();

  };


  return (

    <div className="page">

      {/* HEADER */}

      <section className="page-header">

        <div>

          <div className="eyebrow">
            PAIMANA / PROJECT MONITORING
          </div>

          <h1>
            Project Explorer
          </h1>

          <p>
            Search, filter and monitor infrastructure projects
          </p>

        </div>

        <div className="project-count">

          <strong>
            {filteredProjects.length}
          </strong>

          <span>
            Projects
          </span>

        </div>

      </section>


      {/* SEARCH */}

      <section className="control-panel">

        <div className="search-container">

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {
                handleSearch();
              }

            }}
            placeholder="Search project name..."
          />

          <button
            className="search-button"
            onClick={handleSearch}
          >
            🔍 Search
          </button>

        </div>


        {/* FILTERS */}

        <div className="filters">

          <select
            value={stateFilter}
            onChange={(e) =>
              setStateFilter(e.target.value)
            }
          >

            {states.map((state) => (

              <option
                key={state}
                value={state}
              >
                {state === "ALL"
                  ? "All States"
                  : state}
              </option>

            ))}

          </select>


          <select
            value={sectorFilter}
            onChange={(e) =>
              setSectorFilter(e.target.value)
            }
          >

            {sectors.map((sector) => (

              <option
                key={sector}
                value={sector}
              >
                {sector === "ALL"
                  ? "All Sectors"
                  : sector}
              </option>

            ))}

          </select>


          <select
            value={riskFilter}
            onChange={(e) =>
              setRiskFilter(e.target.value)
            }
          >

            <option value="ALL">
              All Risk Levels
            </option>

            <option value="HIGH">
              High Risk
            </option>

            <option value="MEDIUM">
              Medium Risk
            </option>

            <option value="LOW">
              Low Risk
            </option>

          </select>


          <button
            className="reset-button"
            onClick={resetFilters}
          >
            ↻ Reset
          </button>

        </div>

      </section>


      {/* ERROR */}

      {error && (

        <div className="error-box">
          ⚠️ {error}
        </div>

      )}


      {/* LOADING */}

      {loading ? (

        <div className="loading-box">

          <div className="loader"></div>

          Loading projects...

        </div>

      ) : (

        <>

          {/* PROJECT GRID */}

          <section className="project-grid">

            {filteredProjects
              .slice(0, 100)
              .map((project, index) => {

                const risk =
                  getRisk(project.risk_score);

                return (

                  <Link
                    key={
                      project.project_code ||
                      index
                    }
                    to={`/projects/${encodeURIComponent(
                      project.project_code
                    )}`}
                    className="project-card"
                  >

                    <div className="project-card-top">

                      <span className="project-number">
                        #{index + 1}
                      </span>

                      <span
                        className={`risk-badge ${risk.toLowerCase()}`}
                      >
                        {risk}
                      </span>

                    </div>


                    <h2>
                      {project.project_name ||
                        "Unnamed Project"}
                    </h2>


                    <div className="project-location">

                      📍{" "}
                      {project.state ||
                        "Unknown State"}

                    </div>


                    <div className="project-sector">

                      🏢{" "}
                      {project.sector ||
                        "Unknown Sector"}

                    </div>


                    <div className="project-metrics">

                      <div>

                        <span>
                          Risk Score
                        </span>

                        <strong>
                          {Number(
                            project.risk_score || 0
                          ).toFixed(1)}
                        </strong>

                      </div>


                      <div>

                        <span>
                          Progress
                        </span>

                        <strong>
                          {Number(
                            project.physical_progress_pct ||
                            0
                          ).toFixed(1)}
                          %
                        </strong>

                      </div>


                      <div>

                        <span>
                          Project Cost
                        </span>

                        <strong>
                          ₹
                          {Number(
                            project.original_cost_cr ||
                            0
                          ).toLocaleString("en-IN")}
                          Cr
                        </strong>

                      </div>

                    </div>


                    <div className="project-card-footer">

                      <span>
                        View Project →
                      </span>

                    </div>

                  </Link>

                );

              })}

          </section>


          {/* EMPTY */}

          {filteredProjects.length === 0 && (

            <div className="empty-box">

              <div>
                🔎
              </div>

              <h3>
                No projects found
              </h3>

              <p>
                Try changing your search or filters.
              </p>

            </div>

          )}

        </>

      )}

    </div>

  );
}

export default Projects;