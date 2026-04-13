export default function Card({ children }) {
  return (
    <div className="card">
      <div className="card-inner">{children}</div>
    </div>
  );
}