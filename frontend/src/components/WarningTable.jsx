function WarningTable({ projects }) {

  return (
    <div className="table-card">

      <h3>Highest Priority Projects</h3>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>Project</th>
              <th>State</th>
              <th>Risk</th>
              <th>Priority</th>
              <th>Warnings</th>
            </tr>

          </thead>

          <tbody>

            {projects.slice(0, 10).map(
              (project, index) => (

                <tr key={index}>

                  <td>
                    {project.project_name}
                  </td>

                  <td>
                    {project.state}
                  </td>

                  <td>
                    {Number(
                      project.risk_score
                    ).toFixed(1)}
                  </td>

                  <td>
                    <span
                      className={
                        `priority ${project.warning_priority
                          ?.toLowerCase()}`
                      }
                    >
                      {project.warning_priority}
                    </span>
                  </td>

                  <td>
                    {project.warning_count}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default WarningTable;