const StatCard = ({ label, value }) => (
  <article className="stat-card">
    <span>{label}</span>
    <strong>{value ?? 0}</strong>
  </article>
);

export default StatCard;
