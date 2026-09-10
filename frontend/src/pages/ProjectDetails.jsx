import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProject, getProjectExplanation } from "../services/api";

function ProjectDetails() {

    const { projectCode } = useParams();

    const [project, setProject] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [explanation, setExplanation] = useState(null);

    const [loadingExplanation, setLoadingExplanation] = useState(true);


    useEffect(() => {


        getProjectExplanation(projectCode)
            .then((data) => {
                setExplanation(data);
            })
            .catch((error) => {
                console.error("SHAP explanation error:", error);
            })
            .finally(() => {
                setLoadingExplanation(false);
            });




        const loadProject = async () => {

            try {

                const data =
                    await getProject(projectCode);

                setProject(data);

            } catch (err) {

                console.error(err);

                setError(
                    "Project could not be found."
                );

            } finally {

                setLoading(false);

            }
        };

        loadProject();

    }, [projectCode]);


    if (loading) {

        return (
            <div className="loading">
                Loading project...
            </div>
        );

    }


    if (error) {

        return (
            <div className="page">

                <h2>{error}</h2>

                <Link to="/projects">
                    Back to Projects
                </Link>

            </div>
        );

    }


    return (

        <div className="page">

            <Link
                to="/projects"
                className="back-link"
            >
                ← Back to Projects
            </Link>


            <div className="project-detail-header">

                <h1>
                    {project.project_name}
                </h1>

                <p>
                    Project Code: {project.project_code}
                </p>

            </div>


            {/* RISK */}

            <div className="detail-grid">

                <div className="detail-card">

                    <h3>Risk Score</h3>

                    <div className="big-number">
                        {Number(
                            project.risk_score || 0
                        ).toFixed(1)}
                    </div>

                    <p>
                        {project.risk_level}
                    </p>

                </div>


                <div className="detail-card">

                    <h3>Warning Priority</h3>

                    <div className="big-number">
                        {project.warning_priority}
                    </div>

                    <p>
                        {project.warning_count} warning(s)
                    </p>

                </div>


                <div className="detail-card">

                    <h3>Predicted Cost Overrun</h3>

                    <div className="big-number">

                        {Number(
                            project.predicted_cost_overrun_pct || 0
                        ).toFixed(2)}
                        %

                    </div>

                </div>


                <div className="detail-card">

                    <h3>Predicted Schedule Delay</h3>

                    <div className="big-number">

                        {Number(
                            project.predicted_schedule_delay_days || 0
                        ).toFixed(0)}

                    </div>

                    <p>days</p>

                </div>

            </div>


            {/* PROJECT INFORMATION */}

            <div className="detail-card">

                <h2>Project Information</h2>

                <div className="info-grid">

                    <div>
                        <strong>Ministry</strong>
                        <p>
                            {project.ministry_department}
                        </p>
                    </div>

                    <div>
                        <strong>Sector</strong>
                        <p>{project.sector}</p>
                    </div>

                    <div>
                        <strong>Agency</strong>
                        <p>{project.agency}</p>
                    </div>

                    <div>
                        <strong>State</strong>
                        <p>{project.state}</p>
                    </div>

                    <div>
                        <strong>Original Cost</strong>
                        <p>
                            ₹ {project.original_cost_cr} crore
                        </p>
                    </div>

                    <div>
                        <strong>Revised Cost</strong>
                        <p>
                            ₹ {project.revised_cost_cr} crore
                        </p>
                    </div>

                    <div>
                        <strong>Physical Progress</strong>
                        <p>
                            {project.physical_progress_pct}%
                        </p>
                    </div>

                    <div>
                        <strong>Expenditure</strong>
                        <p>
                            ₹ {project.cumulative_expenditure_cr}
                            {" "}crore
                        </p>
                    </div>

                </div>

            </div>


            {/* WARNING */}

            <div className="warning-detail">

                <h2>Early Warning</h2>

                <p>
                    {project.warning_message}
                </p>

            </div>



            <div className="detail-section">

                <h2>Why is this project risky?</h2>

                {loadingExplanation && (
                    <p>Loading AI explanation...</p>
                )}

                {!loadingExplanation && explanation && (
                    <>
                        <p>
                            Predicted Cost Overrun:
                            <strong>
                                {" "}
                                {explanation.predicted_cost_overrun_pct.toFixed(2)}%
                            </strong>
                        </p>

                        <div className="shap-explanation-list">

                            {explanation.explanations.map((item) => (
                                <div
                                    className="shap-explanation-item"
                                    key={item.feature}
                                >

                                    <div>
                                        <strong>{item.label}</strong>

                                        <p>
                                            Value:{" "}
                                            {item.value !== null
                                                ? item.value.toFixed(2)
                                                : "N/A"}
                                        </p>
                                    </div>

                                    <div>
                                        <strong>
                                            {item.shap_value > 0 ? "+" : ""}
                                            {item.shap_value.toFixed(2)}
                                        </strong>

                                        <p>
                                            {item.direction === "increases"
                                                ? "Increases predicted overrun"
                                                : "Decreases predicted overrun"}
                                        </p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </>
                )}

            </div>
        </div>

    );
}

export default ProjectDetails;