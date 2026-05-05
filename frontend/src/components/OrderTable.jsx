export default function OrderTable({ rows = [] }) { return <div>{rows.map((r) => <div key={r.id}>{r.id}</div>)}</div>; }
