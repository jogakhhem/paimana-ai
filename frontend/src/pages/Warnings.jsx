import { useEffect, useState } from "react";
import {
  getCriticalWarnings,
} from "../services/api";

function Warnings() {

  const [warnings, setWarnings] = useState([]);

  useEffect(() => {

    const loadWarnings = async () => {

      try {

        const result =
          await getCriticalWarnings();

        setWarnings(
          result.warnings || []
        );

      } catch (error) {

        console.error(
          "Warning loading error:",
          error
        );

      }

    };

    loadWarnings();

  }, []);


  return (

    <div className="page">

      <div className="page-header">

        <h1>
          Critical Warnings
        </h1>

        <p>
          Projects requiring immediate attention
        </p>

      </div>


      <div className="warning-list">

        {warnings.map(
          (project, index) => (

            <div
              className="warning-card"
              key={index}
            >

              <div>

                <h3>
                  {project.project_name}
                </h3>

                <p>
                  {project.state} •{" "}
                  {project.sector}
                </p>

                <p>
                  {project.warning_message}
                </p>

              </div>


              <div className="warning-score">

                <strong>
                  {Number(
                    project.risk_score
                  ).toFixed(1)}
                </strong>

                <span>
                  Risk Score
                </span>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );
}

export default Warnings;