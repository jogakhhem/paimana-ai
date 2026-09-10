// import { useEffect, useState } from "react";

// import {
//   getRiskSummary,
//   getHighRiskProjects,
//   getShapImportance,
// } from "../services/api";

// import StatCard from "../components/StatCard";
// import RiskChart from "../components/RiskChart";
// import ShapChart from "../components/ShapChart";
// import WarningTable from "../components/WarningTable";


// function Dashboard() {

//   const [riskSummary, setRiskSummary] = useState(null);

//   const [projects, setProjects] = useState([]);

//   const [shapData, setShapData] = useState([]);


//   useEffect(() => {

//     const loadDashboard = async () => {

//       try {

//         const risk = await getRiskSummary();

//         const highRisk =
//           await getHighRiskProjects();

//         const shap =
//           await getShapImportance();

//         setRiskSummary(risk);

//         setProjects(
//           highRisk.projects || []
//         );

//         setShapData(
//           shap.features || []
//         );

//       } catch (error) {

//         console.error(
//           "Dashboard loading error:",
//           error
//         );

//       }

//     };

//     loadDashboard();

//   }, []);


//   if (!riskSummary) {

//     return (
//       <div className="loading">
//         Loading PAIMANA AI Dashboard...
//       </div>
//     );

//   }


//   const risk =
//     riskSummary.risk_levels || {};


//   const warning =
//     riskSummary.warning_priorities || {};


//   const totalProjects =
//     Object.values(risk)
//       .reduce(
//         (sum, value) =>
//           sum + Number(value),
//         0
//       );


//   return (

//     <div className="dashboard">

//       <header className="dashboard-header">

//         <div>

//           <h1>
//             PAIMANA AI
//           </h1>

//           <p>
//             Intelligent Infrastructure
//             Project Monitoring System
//           </p>

//         </div>

//       </header>


//       {/* STAT CARDS */}

//       <section className="stats-grid">

//         <StatCard
//           title="Total Projects"
//           value={totalProjects}
//           description="Projects monitored"
//         />

//         <StatCard
//           title="High Risk"
//           value={risk.HIGH || 0}
//           description="Projects classified as high risk"
//         />

//         <StatCard
//           title="Critical Warnings"
//           value={warning.CRITICAL || 0}
//           description="Immediate attention required"
//         />

//         <StatCard
//           title="Medium Risk"
//           value={risk.MEDIUM || 0}
//           description="Projects requiring monitoring"
//         />

//       </section>


//       {/* CHARTS */}

//       <section className="charts-grid">

//         <RiskChart
//           data={risk}
//         />

//         <ShapChart
//           data={shapData}
//         />

//       </section>


//       {/* TABLE */}

//       <section>

//         <WarningTable
//           projects={projects}
//         />

//       </section>

//     </div>

//   );

// }

// export default Dashboard;















{/* <div className="page-header">
  <h1>Project Intelligence Dashboard</h1>
  <p>
    AI-powered monitoring, risk prediction and early warning
    for infrastructure projects.
  </p>
</div>

<div className="hero">
  <h1>🚀 PAIMANA AI</h1>

  <p>
    Transforming project monitoring into predictive
    decision-making using Machine Learning,
    Explainable AI and automated early warnings.
  </p>
</div>

<div className="stats-grid">

  <StatCard
    title="Total Projects"
    value={1981}
    description="Projects monitored"
    type="blue"
  />

  <StatCard
    title="Low Risk"
    value={1358}
    description="68.55% of projects"
    type="success"
  />

  <StatCard
    title="Medium Risk"
    value={466}
    description="23.52% of projects"
    type="warning"
  />

  <StatCard
    title="High Risk"
    value={157}
    description="7.92% of projects"
    type="danger"
  />

</div> */}
















// import { useEffect, useState } from "react";

// import {
//   getRiskSummary,
//   getSectorAnalytics,
//   getCriticalWarnings
// } from "../services/api";

// import Sidebar from "../components/Sidebar";
// import TopBar from "../components/TopBar";

// function Dashboard() {

//   const [summary, setSummary] = useState(null);
//   const [sectors, setSectors] = useState([]);
//   const [warnings, setWarnings] = useState([]);

//   useEffect(() => {

//     async function loadDashboard() {

//       try {

//         const summaryData =
//           await getRiskSummary();

//         const sectorData =
//           await getSectorAnalytics();

//         const warningData =
//           await getCriticalWarnings();

//         setSummary(summaryData);

//         setSectors(sectorData);

//         setWarnings(warningData);

//       } catch (error) {

//         console.error(
//           "Dashboard loading error:",
//           error
//         );

//       }

//     }

//     loadDashboard();

//   }, []);

//   if (!summary) {

//     return (
//       <>
//         <Sidebar />
//         <TopBar />

//         <main className="main-content">

//           <div className="loading">
//             Loading PAIMANA AI...
//           </div>

//         </main>
//       </>
//     );

//   }

//   return (
//     <>

//       <Sidebar />

//       <TopBar />

//       <main className="main-content">

//         {/* =========================================
//             HEADER
//         ========================================= */}

//         <h1 className="page-title">

//           <span className="emoji">
//             🏗️
//           </span>

//           PAIMANA AI — Predictive Analytics & Early
//           Warning System

//         </h1>

//         <p className="page-description">

//           AI-powered infrastructure project monitoring
//           platform for predictive cost analysis,
//           schedule-risk detection, project health
//           monitoring and automated early warnings.

//         </p>


//         {/* =========================================
//             KPI SECTION
//         ========================================= */}

//         <div className="kpi-grid">

//           <div className="kpi">

//             <div className="kpi-label">
//               Projects (filtered)
//             </div>

//             <div className="kpi-value">
//               {summary.total_projects || 1981}
//             </div>

//           </div>


//           <div className="kpi">

//             <div className="kpi-label">
//               Avg. Predicted Cost Overrun
//             </div>

//             <div className="kpi-value yellow">
//               {summary.avg_cost_overrun
//                 ? `${summary.avg_cost_overrun.toFixed(1)}%`
//                 : "26.6%"}
//             </div>

//           </div>


//           <div className="kpi">

//             <div className="kpi-label">
//               Avg. Predicted Time Overrun
//             </div>

//             <div className="kpi-value blue">

//               {summary.avg_time_overrun
//                 ? `${Math.round(
//                     summary.avg_time_overrun
//                   )} days`
//                 : "212 days"}

//             </div>

//           </div>


//           <div className="kpi">

//             <div className="kpi-label">
//               High Risk Projects
//             </div>

//             <div className="kpi-value red">

//               {summary.high_risk || 157}

//             </div>

//           </div>

//         </div>


//         {/* =========================================
//             RISK CHARTS
//         ========================================= */}

//         <section className="section">

//           <div className="chart-grid">

//             <div className="chart-card">

//               <h3 className="chart-title">
//                 Risk Score Distribution
//               </h3>

//               <div
//                 style={{
//                   height: "280px",
//                   display: "flex",
//                   alignItems: "flex-end",
//                   gap: "3px"
//                 }}
//               >

//                 {Array.from(
//                   { length: 45 },
//                   (_, i) => {

//                     const height =
//                       35 +
//                       Math.sin(i * 0.4) * 80 +
//                       Math.random() * 80;

//                     return (
//                       <div
//                         key={i}
//                         style={{
//                           flex: 1,
//                           height: `${Math.max(
//                             25,
//                             height
//                           )}px`,

//                           background:
//                             i < 18
//                               ? "#4caf50"
//                               : i < 33
//                               ? "#ffc107"
//                               : "#ff4b4b",

//                           minWidth: "5px"
//                         }}
//                       />
//                     );

//                   }
//                 )}

//               </div>

//               <div
//                 style={{
//                   textAlign: "center",
//                   color: "#8f96a3",
//                   fontSize: "13px"
//                 }}
//               >
//                 risk_score
//               </div>

//             </div>


//             <div className="chart-card">

//               <h3 className="chart-title">
//                 Average Risk Score by Sector
//               </h3>

//               <div>

//                 {sectors
//                   .slice(0, 10)
//                   .map((sector, index) => {

//                     const score =
//                       Number(
//                         sector.avg_risk_score ||
//                         sector.risk_score ||
//                         30
//                       );

//                     return (
//                       <div
//                         key={index}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           marginBottom: "10px"
//                         }}
//                       >

//                         <div
//                           style={{
//                             width: "180px",
//                             textAlign: "right",
//                             marginRight: "15px",
//                             fontSize: "12px",
//                             color: "#e4e7eb"
//                           }}
//                         >
//                           {sector.sector}
//                         </div>

//                         <div
//                           style={{
//                             height: "14px",
//                             width: `${Math.min(
//                               score * 2,
//                               370
//                             )}px`,

//                             background:
//                               "#79bdf2",

//                             border:
//                               "1px solid #a7d6f7"
//                           }}
//                         />

//                       </div>
//                     );

//                   })}

//               </div>

//             </div>

//           </div>

//         </section>


//         {/* =========================================
//             PROJECT PORTFOLIO
//         ========================================= */}

//         <section className="section">

//           <h2 className="section-title">
//             📋 Project Portfolio
//           </h2>

//           <ProjectTable />

//         </section>


//         {/* =========================================
//             DRILL DOWN
//         ========================================= */}

//         <section className="section">

//           <h2 className="section-title">
//             🔍 Project Drill-Down
//           </h2>

//           <div className="drilldown">

//             <label className="drilldown-label">
//               Select a project
//             </label>

//             <select className="project-select">

//               <option>
//                 PRJ-100000
//               </option>

//               <option>
//                 PRJ-100763
//               </option>

//               <option>
//                 PRJ-100333
//               </option>

//               <option>
//                 PRJ-100408
//               </option>

//             </select>

//           </div>


//           <div className="project-info-grid">

//             <div className="project-info-item">
//               <strong>Ministry:</strong>{" "}
//               Ministry of Jal Shakti
//             </div>

//             <div className="project-info-item">
//               <strong>Approved Cost:</strong>{" "}
//               ₹150.0 Cr
//             </div>

//             <div className="project-info-item">
//               <strong>
//                 Predicted Cost Overrun:
//               </strong>{" "}
//               <span className="risk-medium">
//                 14.5%
//               </span>
//             </div>

//           </div>


//           <div className="metrics-panel">

//             <div className="metric-box">

//               <div className="metric-label">
//                 Physical Progress
//               </div>

//               <div className="metric-value">
//                 62%
//               </div>

//             </div>

//             <div className="metric-box">

//               <div className="metric-label">
//                 Expenditure Ratio
//               </div>

//               <div className="metric-value">
//                 74%
//               </div>

//             </div>

//             <div className="metric-box">

//               <div className="metric-label">
//                 Risk Score
//               </div>

//               <div className="metric-value risk-medium">
//                 58.4
//               </div>

//             </div>

//           </div>

//         </section>


//         {/* =========================================
//             EARLY WARNINGS
//         ========================================= */}

//         <section className="warning-section">

//           <h2 className="warning-title">
//             🚨 Early Warning Alerts
//           </h2>

//           <div className="table-wrapper">

//             <table className="data-table">

//               <thead>

//                 <tr>

//                   <th>Project ID</th>
//                   <th>Project Name</th>
//                   <th>Ministry</th>
//                   <th>Sector</th>
//                   <th>State</th>
//                   <th>Risk Score</th>
//                   <th>Risk Band</th>
//                   <th>Alert Reason</th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {warnings
//                   .slice(0, 15)
//                   .map((project, index) => (

//                     <tr key={index}>

//                       <td>
//                         {project.project_id ||
//                           project.project_code}
//                       </td>

//                       <td>
//                         {project.project_name}
//                       </td>

//                       <td>
//                         {project.ministry ||
//                           project.ministry_department}
//                       </td>

//                       <td>
//                         {project.sector}
//                       </td>

//                       <td>
//                         {project.state}
//                       </td>

//                       <td>
//                         {project.risk_score}
//                       </td>

//                       <td className="risk-high">
//                         {project.risk_band ||
//                           project.risk_level ||
//                           "High"}
//                       </td>

//                       <td className="alert-reason">
//                         {project.alert_reason ||
//                           project.warning_message ||
//                           "Projected cost overrun detected"}
//                       </td>

//                     </tr>

//                   ))}

//               </tbody>

//             </table>

//           </div>

//         </section>

//       </main>

//     </>
//   );
// }


// /* =====================================================
//    PROJECT TABLE
// ===================================================== */

// function ProjectTable() {

//   const projects = [
//     {
//       id: "PRJ-100763",
//       name: "Infrastructure Project 764",
//       ministry: "Ministry of Steel",
//       sector: "Social Infrastructure",
//       state: "Bihar",
//       cost: "471.9",
//       revised: "972.06",
//       progress: "58%"
//     },

//     {
//       id: "PRJ-100333",
//       name: "Infrastructure Project 334",
//       ministry: "Ministry of Housing & Urban Affairs",
//       sector: "Metro Rail",
//       state: "Multi-State",
//       cost: "280",
//       revised: "658.04",
//       progress: "42%"
//     },

//     {
//       id: "PRJ-100408",
//       name: "Infrastructure Project 409",
//       ministry: "Ministry of Power",
//       sector: "Atomic Energy",
//       state: "Odisha",
//       cost: "221.01",
//       revised: "404.76",
//       progress: "63%"
//     },

//     {
//       id: "PRJ-100795",
//       name: "Infrastructure Project 796",
//       ministry: "Ministry of Communications",
//       sector: "Mining",
//       state: "Telangana",
//       cost: "150",
//       revised: "312.97",
//       progress: "37%"
//     },

//     {
//       id: "PRJ-101572",
//       name: "Infrastructure Project 1573",
//       ministry: "Ministry of Power",
//       sector: "Renewable Energy",
//       state: "Odisha",
//       cost: "557.77",
//       revised: "1065.6",
//       progress: "48%"
//     },

//     {
//       id: "PRJ-101294",
//       name: "Infrastructure Project 1295",
//       ministry: "Ministry of Road Transport & Highways",
//       sector: "Coal",
//       state: "Bihar",
//       cost: "262.2",
//       revised: "513.14",
//       progress: "51%"
//     },

//     {
//       id: "PRJ-101306",
//       name: "Infrastructure Project 1307",
//       ministry: "Ministry of Housing & Urban Affairs",
//       sector: "Ports",
//       state: "Madhya Pradesh",
//       cost: "4051.95",
//       revised: "8503.98",
//       progress: "29%"
//     },

//     {
//       id: "PRJ-100003",
//       name: "Infrastructure Project 4",
//       ministry: "Ministry of Housing & Urban Affairs",
//       sector: "Metro Rail",
//       state: "Bihar",
//       cost: "1192.99",
//       revised: "2147.33",
//       progress: "46%"
//     },

//     {
//       id: "PRJ-101902",
//       name: "Infrastructure Project 1903",
//       ministry: "Ministry of Housing & Urban Affairs",
//       sector: "Renewable Energy",
//       state: "Madhya Pradesh",
//       cost: "208.47",
//       revised: "441.47",
//       progress: "53%"
//     },

//     {
//       id: "PRJ-100706",
//       name: "Infrastructure Project 707",
//       ministry: "Ministry of Civil Aviation",
//       sector: "Shipping",
//       state: "Bihar",
//       cost: "285.01",
//       revised: "659.76",
//       progress: "39%"
//     }
//   ];

//   return (

//     <div className="table-wrapper">

//       <table className="data-table">

//         <thead>

//           <tr>

//             <th>project_id</th>
//             <th>project_name</th>
//             <th>ministry</th>
//             <th>sector</th>
//             <th>state</th>
//             <th>approved_cost_cr</th>
//             <th>revised_cost_cr</th>
//             <th>physical_progress</th>

//           </tr>

//         </thead>

//         <tbody>

//           {projects.map((project) => (

//             <tr key={project.id}>

//               <td>
//                 {project.id}
//               </td>

//               <td>
//                 {project.name}
//               </td>

//               <td>
//                 {project.ministry}
//               </td>

//               <td>
//                 {project.sector}
//               </td>

//               <td>
//                 {project.state}
//               </td>

//               <td>
//                 {project.cost}
//               </td>

//               <td>
//                 {project.revised}
//               </td>

//               <td>
//                 {project.progress}
//               </td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//     </div>

//   );
// }

// export default Dashboard;

















import { useEffect, useMemo, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  Legend
} from "recharts";

import {
  getProjects
} from "../services/api";

import Sidebar from "../components/Sidebar";


// ======================================================
// COLORS
// ======================================================

const COLORS = [
  "#4caf50",
  "#ffc107",
  "#ff4b4b",
  "#58a6ff",
  "#9b6cff",
  "#56ccf2",
  "#ff8c42",
  "#e879f9"
];


// ======================================================
// HELPER FUNCTIONS
// ======================================================

function number(value) {

  const n = Number(value);

  return Number.isFinite(n) ? n : 0;

}


function getRiskBand(project) {

  return (
    project.risk_band ||
    project.risk_level ||
    project.warning_priority ||
    "Low"
  );

}


function getProjectName(project) {

  return (
    project.project_name ||
    "Unknown Project"
  );

}


function getMinistry(project) {

  return (
    project.ministry ||
    project.ministry_department ||
    "Unknown Ministry"
  );

}


// ======================================================
// DASHBOARD
// ======================================================

function Dashboard() {

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // FILTERS

  const [selectedSector, setSelectedSector] =
    useState("");

  const [selectedMinistry, setSelectedMinistry] =
    useState("");

  const [selectedRisks, setSelectedRisks] =
    useState([
      "Low",
      "Medium",
      "High"
    ]);

  const [searchText, setSearchText] =
    useState("");


  // ====================================================
  // LOAD PROJECTS
  // ====================================================

  useEffect(() => {

    async function loadProjects() {

      try {

        setLoading(true);

        const response =
          await getProjects();

        const data =
          Array.isArray(response)
            ? response
            : response.projects || [];

        setProjects(data);

      } catch (err) {

        console.error(err);

        setError(
          "Unable to load projects from FastAPI."
        );

      } finally {

        setLoading(false);

      }

    }

    loadProjects();

  }, []);


  // ====================================================
  // UNIQUE SECTORS
  // ====================================================

  const sectors = useMemo(() => {

    return [
      ...new Set(
        projects
          .map(
            (project) =>
              project.sector
          )
          .filter(Boolean)
      )
    ].sort();

  }, [projects]);


  // ====================================================
  // UNIQUE MINISTRIES
  // ====================================================

  const ministries = useMemo(() => {

    return [
      ...new Set(
        projects
          .map(getMinistry)
          .filter(Boolean)
      )
    ].sort();

  }, [projects]);


  // ====================================================
  // FILTER PROJECTS
  // ====================================================

  const filteredProjects = useMemo(() => {

    return projects.filter(
      (project) => {

        const sectorMatch =
          !selectedSector ||
          project.sector === selectedSector;


        const ministryMatch =
          !selectedMinistry ||
          getMinistry(project) ===
            selectedMinistry;


        const risk =
          getRiskBand(project);


        const riskMatch =
          selectedRisks.length === 0 ||
          selectedRisks.some(
            (selected) =>
              risk
                .toLowerCase()
                .includes(
                  selected.toLowerCase()
                )
          );


        const search =
          searchText
            .toLowerCase()
            .trim();


        const searchMatch =
          !search ||
          getProjectName(project)
            .toLowerCase()
            .includes(search) ||

          String(
            project.project_code || ""
          )
            .toLowerCase()
            .includes(search);


        return (
          sectorMatch &&
          ministryMatch &&
          riskMatch &&
          searchMatch
        );

      }
    );

  }, [
    projects,
    selectedSector,
    selectedMinistry,
    selectedRisks,
    searchText
  ]);


  // ====================================================
  // KPI CALCULATIONS
  // ====================================================

  const totalProjects =
    filteredProjects.length;


  const averageCostOverrun =
    filteredProjects.length > 0
      ? filteredProjects.reduce(
          (sum, project) =>
            sum +
            number(
              project.predicted_cost_overrun_pct ||
              project.cost_overrun_pct
            ),
          0
        ) / filteredProjects.length
      : 0;


  const averageTimeOverrun =
    filteredProjects.length > 0
      ? filteredProjects.reduce(
          (sum, project) =>
            sum +
            number(
              project.predicted_schedule_delay_days ||
              project.schedule_delay_days
            ),
          0
        ) / filteredProjects.length
      : 0;


  const highRiskProjects =
    filteredProjects.filter(
      (project) =>
        getRiskBand(project)
          .toLowerCase()
          .includes("high")
    ).length;


  // ====================================================
  // RISK DISTRIBUTION
  // ====================================================

  const riskDistribution = useMemo(() => {

    const counts = {
      Low: 0,
      Medium: 0,
      High: 0
    };

    filteredProjects.forEach(
      (project) => {

        const risk =
          getRiskBand(project)
            .toLowerCase();

        if (risk.includes("low")) {
          counts.Low++;
        }

        else if (
          risk.includes("medium")
        ) {
          counts.Medium++;
        }

        else if (
          risk.includes("high")
        ) {
          counts.High++;
        }

      }
    );

    return [

      {
        name: "Low",
        value: counts.Low
      },

      {
        name: "Medium",
        value: counts.Medium
      },

      {
        name: "High",
        value: counts.High
      }

    ];

  }, [filteredProjects]);


  // ====================================================
  // SECTOR RISK
  // ====================================================

  const sectorRiskData = useMemo(() => {

    const grouped = {};

    filteredProjects.forEach(
      (project) => {

        const sector =
          project.sector ||
          "Unknown";

        if (!grouped[sector]) {

          grouped[sector] = {
            total: 0,
            risk: 0
          };

        }

        grouped[sector].total++;

        grouped[sector].risk +=
          number(
            project.risk_score
          );

      }
    );


    return Object.entries(grouped)
      .map(
        ([sector, data]) => ({

          sector,

          risk_score:
            data.total > 0
              ? data.risk / data.total
              : 0

        })
      )
      .sort(
        (a, b) =>
          b.risk_score -
          a.risk_score
      )
      .slice(0, 12);

  }, [filteredProjects]);


  // ====================================================
  // COST VS PHYSICAL PROGRESS
  // ====================================================

  const costProgressData =
    filteredProjects
      .map((project) => ({

        progress:
          number(
            project.physical_progress_pct
          ),

        cost:
          number(
            project.predicted_cost_overrun_pct ||
            project.cost_overrun_pct
          )

      }))
      .filter(
        (item) =>
          item.progress >= 0 &&
          item.cost !== 0
      )
      .slice(0, 500);


  // ====================================================
  // EXPENDITURE VS PROGRESS
  // ====================================================

  const expenditureData = useMemo(() => {

    const groups = {};

    filteredProjects.forEach(
      (project) => {

        const progress =
          Math.round(
            number(
              project.physical_progress_pct
            ) / 10
          ) * 10;


        if (!groups[progress]) {

          groups[progress] = {
            progress,
            expenditure: 0,
            count: 0
          };

        }


        groups[progress].expenditure +=
          number(
            project.expenditure_ratio_pct
          );

        groups[progress].count++;

      }
    );


    return Object.values(groups)
      .map((item) => ({

        progress:
          item.progress,

        expenditure:
          item.count > 0
            ? item.expenditure /
              item.count
            : 0

      }))
      .sort(
        (a, b) =>
          a.progress -
          b.progress
      );

  }, [filteredProjects]);


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <>

      <Sidebar
      

        sectors={sectors}

        ministries={ministries}

        selectedSector={selectedSector}

        selectedMinistry={selectedMinistry}

        selectedRisks={selectedRisks}

        setSelectedSector={
          setSelectedSector
        }

        setSelectedMinistry={
          setSelectedMinistry
        }

        setSelectedRisks={
          setSelectedRisks
        }

        searchText={searchText}

        setSearchText={setSearchText}

      />


      <main className="main-content">


        {/* =========================================
            HEADER
        ========================================= */}

        <h1 className="page-title">

          🏗️ PAIMANA AI — Predictive Analytics
          & Early Warning System

        </h1>


        <p className="page-description">

          AI-powered infrastructure project
          monitoring platform for predictive
          cost analysis, schedule-risk detection,
          project health monitoring and automated
          early warnings.

        </p>


        {loading && (

          <div className="loading">
            Loading PAIMANA project data...
          </div>

        )}


        {error && (

          <div className="error">
            {error}
          </div>

        )}


        {!loading && !error && (

          <>


            {/* =====================================
                KPI
            ===================================== */}

            <div className="kpi-grid">


              <div className="kpi">

                <div className="kpi-label">
                  Projects (filtered)
                </div>

                <div className="kpi-value">
                  {totalProjects}
                </div>

              </div>


              <div className="kpi">

                <div className="kpi-label">
                  Avg. Predicted Cost Overrun
                </div>

                <div className="kpi-value yellow">
                  {averageCostOverrun.toFixed(1)}%
                </div>

              </div>


              <div className="kpi">

                <div className="kpi-label">
                  Avg. Predicted Time Overrun
                </div>

                <div className="kpi-value blue">
                  {Math.round(
                    averageTimeOverrun
                  )} days
                </div>

              </div>


              <div className="kpi">

                <div className="kpi-label">
                  High Risk Projects
                </div>

                <div className="kpi-value red">
                  {highRiskProjects}
                </div>

              </div>


            </div>


            {/* =====================================
                CHARTS
            ===================================== */}

            <section className="section">

              <div className="chart-grid">


                {/* RISK DISTRIBUTION */}

                <div className="chart-card">

                  <h3 className="chart-title">

                    Risk Score Distribution

                  </h3>


                  <ResponsiveContainer
                    width="100%"
                    height={320}
                  >

                    <PieChart>

                      <Pie

                        data={riskDistribution}

                        dataKey="value"

                        nameKey="name"

                        cx="50%"

                        cy="50%"

                        outerRadius={110}

                        label

                      >

                        {riskDistribution.map(
                          (_, index) => (

                            <Cell
                              key={index}
                              fill={
                                COLORS[index]
                              }
                            />

                          )
                        )}

                      </Pie>


                      <Tooltip
                        contentStyle={{
                          background:
                            "#181b22",

                          border:
                            "1px solid #333",

                          color:
                            "white"
                        }}
                      />


                      <Legend />

                    </PieChart>

                  </ResponsiveContainer>

                </div>


                {/* SECTOR RISK */}

                <div className="chart-card">

                  <h3 className="chart-title">

                    Average Risk Score by Sector

                  </h3>


                  <ResponsiveContainer
                    width="100%"
                    height={360}
                  >

                    <BarChart
                      data={
                        sectorRiskData
                      }

                      layout="vertical"

                      margin={{
                        left: 20,
                        right: 30
                      }}
                    >

                      <CartesianGrid
                        stroke="#2d333b"
                        horizontal={false}
                      />

                      <XAxis
                        type="number"
                        stroke="#8b949e"
                      />

                      <YAxis
                        type="category"
                        dataKey="sector"
                        stroke="#8b949e"
                        width={150}
                      />

                      <Tooltip
                        contentStyle={{
                          background:
                            "#181b22",

                          border:
                            "1px solid #333",

                          color:
                            "white"
                        }}
                      />

                      <Bar
                        dataKey="risk_score"
                        fill="#79bdf2"
                        radius={[0, 3, 3, 0]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>


              </div>

            </section>


            {/* =====================================
                SCATTER + LINE
            ===================================== */}

            <section className="section">

              <div className="chart-grid">


                {/* COST VS PROGRESS */}

                <div className="chart-card">

                  <h3 className="chart-title">

                    Cost Overrun vs Physical Progress

                  </h3>


                  <ResponsiveContainer
                    width="100%"
                    height={350}
                  >

                    <ScatterChart>

                      <CartesianGrid
                        stroke="#2d333b"
                      />

                      <XAxis

                        type="number"

                        dataKey="progress"

                        name="Physical Progress"

                        stroke="#8b949e"

                        label={{
                          value:
                            "Physical Progress (%)",

                          position:
                            "insideBottom",

                          offset:
                            -5,

                          fill:
                            "#8b949e"
                        }}

                      />

                      <YAxis

                        type="number"

                        dataKey="cost"

                        name="Cost Overrun"

                        stroke="#8b949e"

                        label={{
                          value:
                            "Cost Overrun (%)",

                          angle:
                            -90,

                          position:
                            "insideLeft",

                          fill:
                            "#8b949e"
                        }}

                      />

                      <Tooltip
                        cursor={{
                          strokeDasharray:
                            "3 3"
                        }}

                        contentStyle={{
                          background:
                            "#181b22",

                          border:
                            "1px solid #333",

                          color:
                            "white"
                        }}
                      />

                      <Scatter
                        data={
                          costProgressData
                        }

                        fill="#58a6ff"

                      />

                    </ScatterChart>

                  </ResponsiveContainer>

                </div>


                {/* EXPENDITURE */}

                <div className="chart-card">

                  <h3 className="chart-title">

                    Expenditure Ratio vs Physical Progress

                  </h3>


                  <ResponsiveContainer
                    width="100%"
                    height={350}
                  >

                    <LineChart
                      data={
                        expenditureData
                      }
                    >

                      <CartesianGrid
                        stroke="#2d333b"
                      />

                      <XAxis
                        dataKey="progress"
                        stroke="#8b949e"
                        label={{
                          value:
                            "Physical Progress (%)",

                          position:
                            "insideBottom",

                          offset:
                            -5,

                          fill:
                            "#8b949e"
                        }}
                      />

                      <YAxis
                        stroke="#8b949e"
                        label={{
                          value:
                            "Expenditure Ratio (%)",

                          angle:
                            -90,

                          position:
                            "insideLeft",

                          fill:
                            "#8b949e"
                        }}
                      />

                      <Tooltip
                        contentStyle={{
                          background:
                            "#181b22",

                          border:
                            "1px solid #333",

                          color:
                            "white"
                        }}
                      />

                      <Line

                        type="monotone"

                        dataKey="expenditure"

                        stroke="#56ccf2"

                        strokeWidth={3}

                        dot={{
                          r: 4
                        }}

                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>


              </div>

            </section>


            {/* =====================================
                PROJECT PORTFOLIO
            ===================================== */}

            <section className="section">

              <h2 className="section-title">

                📋 Project Portfolio

              </h2>


              <div className="table-wrapper">

                <table className="data-table">

                  <thead>

                    <tr>

                      <th>
                        project_id
                      </th>

                      <th>
                        project_name
                      </th>

                      <th>
                        ministry
                      </th>

                      <th>
                        sector
                      </th>

                      <th>
                        state
                      </th>

                      <th>
                        original_cost_cr
                      </th>

                      <th>
                        revised_cost_cr
                      </th>

                      <th>
                        physical_progress
                      </th>

                      <th>
                        risk_score
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredProjects
                      .slice(0, 100)
                      .map(
                        (
                          project,
                          index
                        ) => (

                          <tr
                            key={
                              project.project_code ||
                              index
                            }
                          >

                            <td>
                              {
                                project.project_code ||
                                project.project_id ||
                                "-"
                              }
                            </td>

                            <td>
                              {
                                project.project_name ||
                                "-"
                              }
                            </td>

                            <td>
                              {
                                getMinistry(
                                  project
                                )
                              }
                            </td>

                            <td>
                              {
                                project.sector ||
                                "-"
                              }
                            </td>

                            <td>
                              {
                                project.state ||
                                "-"
                              }
                            </td>

                            <td>
                              {
                                number(
                                  project.original_cost_cr
                                ).toFixed(2)
                              }
                            </td>

                            <td>
                              {
                                number(
                                  project.revised_cost_cr
                                ).toFixed(2)
                              }
                            </td>

                            <td>
                              {
                                number(
                                  project.physical_progress_pct
                                ).toFixed(1)
                              }%
                            </td>

                            <td>

                              <span
                                className={
                                  `risk-badge ${
                                    getRiskBand(
                                      project
                                    )
                                      .toLowerCase()
                                  }`
                                }
                              >

                                {
                                  number(
                                    project.risk_score
                                  ).toFixed(1)
                                }

                              </span>

                            </td>

                          </tr>

                        )
                      )}

                  </tbody>

                </table>

              </div>


              <p
                style={{
                  marginTop: "12px",
                  color: "#8b949e",
                  fontSize: "12px"
                }}
              >

                Showing first{" "}
                {Math.min(
                  100,
                  filteredProjects.length
                )}{" "}
                of{" "}
                {filteredProjects.length}{" "}
                filtered projects.

              </p>

            </section>


            {/* =====================================
                DRILL DOWN
            ===================================== */}

            <section className="section">

              <h2 className="section-title">

                🔍 Project Drill-Down

              </h2>


              <label className="drilldown-label">

                Select a project

              </label>


              <select
                className="project-select"
                onChange={(e) => {

                  const project =
                    filteredProjects.find(
                      (p) =>
                        (
                          p.project_code ||
                          p.project_id
                        ) === e.target.value
                    );

                  console.log(
                    "Selected Project:",
                    project
                  );

                }}
              >

                {filteredProjects
                  .slice(0, 100)
                  .map(
                    (project, index) => (

                      <option
                        key={index}
                        value={
                          project.project_code ||
                          project.project_id
                        }
                      >

                        {
                          project.project_code ||
                          project.project_id
                        }

                      </option>

                    )
                  )}

              </select>

            </section>


            {/* =====================================
                EARLY WARNING
            ===================================== */}

            <section className="warning-section">

              <h2 className="warning-title">

                🚨 Early Warning Alerts

              </h2>


              <div className="table-wrapper">

                <table className="data-table">

                  <thead>

                    <tr>

                      <th>
                        project_id
                      </th>

                      <th>
                        project_name
                      </th>

                      <th>
                        ministry
                      </th>

                      <th>
                        sector
                      </th>

                      <th>
                        state
                      </th>

                      <th>
                        risk_score
                      </th>

                      <th>
                        risk_band
                      </th>

                      <th>
                        alert_reason
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredProjects

                      .filter(
                        (project) =>
                          getRiskBand(
                            project
                          )
                            .toLowerCase()
                            .includes(
                              "high"
                            )
                      )

                      .sort(
                        (a, b) =>
                          number(
                            b.risk_score
                          ) -
                          number(
                            a.risk_score
                          )
                      )

                      .slice(0, 20)

                      .map(
                        (
                          project,
                          index
                        ) => (

                          <tr
                            key={index}
                          >

                            <td>
                              {
                                project.project_code ||
                                project.project_id ||
                                "-"
                              }
                            </td>

                            <td>
                              {
                                project.project_name
                              }
                            </td>

                            <td>
                              {
                                getMinistry(
                                  project
                                )
                              }
                            </td>

                            <td>
                              {
                                project.sector
                              }
                            </td>

                            <td>
                              {
                                project.state
                              }
                            </td>

                            <td
                              className="risk-high"
                            >
                              {
                                number(
                                  project.risk_score
                                ).toFixed(1)
                              }
                            </td>

                            <td
                              className="risk-high"
                            >
                              {
                                getRiskBand(
                                  project
                                )
                              }
                            </td>

                            <td className="alert-reason">

                              {
                                project.alert_reason ||
                                project.warning_message ||
                                "Early warning condition detected"
                              }

                            </td>

                          </tr>

                        )
                      )}

                  </tbody>

                </table>

              </div>

            </section>


          </>

        )}

      </main>

    </>

  );

}

export default Dashboard;