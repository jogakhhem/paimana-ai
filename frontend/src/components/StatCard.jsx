// function StatCard({ title, value, description }) {
//   return (
//     <div className="stat-card">
//       <p className="stat-title">{title}</p>

//       <h2>{value}</h2>

//       <p className="stat-description">
//         {description}
//       </p>
//     </div>
//   );
// }

// export default StatCard;




function StatCard({
  title,
  value,
  description,
  type = "blue"
}) {
  return (
    <div className={`stat-card ${type}`}>

      <h3>{title}</h3>

      <div className="value">
        {value}
      </div>

      {description && (
        <div className="description">
          {description}
        </div>
      )}

    </div>
  );
}

export default StatCard;