
const Badge = ({ status }) => (
    <div className={`badge rounded-pill d-inline bg-${status === "pending" ? "warning" : status === "complete" ? 'success' : 'danger' } m-3`}>{status}</div>
)

export default Badge;
