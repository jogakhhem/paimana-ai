// function Sidebar() {
//   return (
//     <aside className="sidebar">

//       <div className="sidebar-toggle">
//         «
//       </div>

//       <h2>Filters</h2>

//       <div className="filter-group">

//         <label>Sector</label>

//         <select className="filter-select">
//           <option>Choose options</option>
//           <option>Roads & Bridges</option>
//           <option>Housing</option>
//           <option>Ports</option>
//           <option>Railways</option>
//           <option>Energy</option>
//           <option>Mining</option>
//           <option>Coal</option>
//           <option>Telecommunications</option>
//         </select>

//       </div>

//       <div className="filter-group">

//         <label>Ministry</label>

//         <select className="filter-select">

//           <option>Choose options</option>

//           <option>
//             Ministry of Power
//           </option>

//           <option>
//             Ministry of Housing & Urban Affairs
//           </option>

//           <option>
//             Ministry of Road Transport & Highways
//           </option>

//           <option>
//             Ministry of Communications
//           </option>

//         </select>

//       </div>

//       <div className="filter-group">

//         <label>Risk Band</label>

//         <div className="risk-filter">

//           <div className="risk-tag">
//             Low <span>×</span>
//           </div>

//           <div className="risk-tag">
//             Medium <span>×</span>
//           </div>

//           <div className="risk-tag">
//             High <span>×</span>
//           </div>

//           <div className="risk-filter-arrow">
//             ⌄
//           </div>

//         </div>

//       </div>

//     </aside>
//   );
// }

// export default Sidebar;













function Sidebar({
  sectors,
  ministries,
  selectedSector,
  selectedMinistry,
  selectedRisks,
  setSelectedSector,
  setSelectedMinistry,
  setSelectedRisks,
  searchText,
  setSearchText
}) {

  const toggleRisk = (risk) => {

    if (selectedRisks.includes(risk)) {

      setSelectedRisks(
        selectedRisks.filter(
          (item) => item !== risk
        )
      );

    } else {

      setSelectedRisks([
        ...selectedRisks,
        risk
      ]);

    }

  };

  return (

    <aside className="sidebar">

      <div className="sidebar-toggle">
        «
      </div>

      <h2>Filters</h2>


      {/* SEARCH */}

      <div className="filter-group">

        <label>
          🔎 Search Project
        </label>

        <input
          type="text"
          className="filter-select"
          placeholder="Search project..."
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
        />

      </div>


      {/* SECTOR */}

      <div className="filter-group">

        <label>
          Sector
        </label>

        <select
          className="filter-select"
          value={selectedSector}
          onChange={(e) =>
            setSelectedSector(e.target.value)
          }
        >

          <option value="">
            Choose options
          </option>

          {sectors.map((sector) => (

            <option
              key={sector}
              value={sector}
            >
              {sector}
            </option>

          ))}

        </select>

      </div>


      {/* MINISTRY */}

      <div className="filter-group">

        <label>
          Ministry
        </label>

        <select
          className="filter-select"
          value={selectedMinistry}
          onChange={(e) =>
            setSelectedMinistry(e.target.value)
          }
        >

          <option value="">
            Choose options
          </option>

          {ministries.map((ministry) => (

            <option
              key={ministry}
              value={ministry}
            >
              {ministry}
            </option>

          ))}

        </select>

      </div>


      {/* RISK */}

      <div className="filter-group">

        <label>
          Risk Band
        </label>

        <div className="risk-filter">

          {["Low", "Medium", "High"].map(
            (risk) => (

              <button
                key={risk}
                className={
                  selectedRisks.includes(risk)
                    ? "risk-tag"
                    : "risk-tag inactive"
                }
                onClick={() =>
                  toggleRisk(risk)
                }
              >

                {risk}

                {selectedRisks.includes(risk)
                  ? " ×"
                  : ""}

              </button>

            )
          )}

        </div>

      </div>


      {/* RESET */}

      <button
        className="reset-button"
        onClick={() => {

          setSelectedSector("");
          setSelectedMinistry("");
          setSelectedRisks([]);
          setSearchText("");

        }}
      >
        ↻ Reset Filters
      </button>

    </aside>

  );
}

export default Sidebar;