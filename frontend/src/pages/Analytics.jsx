import { useEffect, useState } from "react";

import {
  getStateAnalytics,
  getSectorAnalytics,
} from "../services/api";

function Analytics() {

  const [states, setStates] = useState([]);

  const [sectors, setSectors] = useState([]);


  useEffect(() => {

    const loadAnalytics = async () => {

      try {

        const stateData =
          await getStateAnalytics();

        const sectorData =
          await getSectorAnalytics();

        setStates(
          stateData.states || []
        );

        setSectors(
          sectorData.sectors || []
        );

      } catch (error) {

        console.error(
          "Analytics error:",
          error
        );

      }

    };

    loadAnalytics();

  }, []);


  return (

    <div className="page">

      <div className="page-header">

        <h1>Analytics</h1>

        <p>
          Infrastructure project risk analysis
        </p>

      </div>


      <div className="table-card">

        <h2>
          State-wise Risk
        </h2>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>State</th>
                <th>Projects</th>
                <th>Average Risk</th>
                <th>Cost Overrun</th>
                <th>Schedule Delay</th>
              </tr>

            </thead>

            <tbody>

              {states.map(
                (state, index) => (

                  <tr key={index}>

                    <td>
                      {state.state}
                    </td>

                    <td>
                      {state.projects}
                    </td>

                    <td>
                      {Number(
                        state.average_risk
                      ).toFixed(1)}
                    </td>

                    <td>
                      {Number(
                        state.average_cost_overrun
                      ).toFixed(1)}
                      %
                    </td>

                    <td>
                      {Number(
                        state.average_schedule_delay
                      ).toFixed(0)}
                      days
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>


      <div className="table-card">

        <h2>
          Sector-wise Risk
        </h2>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>Sector</th>
                <th>Projects</th>
                <th>Average Risk</th>
                <th>Cost Overrun</th>
                <th>Schedule Delay</th>
              </tr>

            </thead>

            <tbody>

              {sectors.map(
                (sector, index) => (

                  <tr key={index}>

                    <td>
                      {sector.sector}
                    </td>

                    <td>
                      {sector.projects}
                    </td>

                    <td>
                      {Number(
                        sector.average_risk
                      ).toFixed(1)}
                    </td>

                    <td>
                      {Number(
                        sector.average_cost_overrun
                      ).toFixed(1)}
                      %
                    </td>

                    <td>
                      {Number(
                        sector.average_schedule_delay
                      ).toFixed(0)}
                      days
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default Analytics;