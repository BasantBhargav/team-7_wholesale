export default function PricingTable({ tiers = [] }) { return <div>{tiers.map((t, i) => <div key={i}>{t.minQty}-{t.maxQty || '+'}: INR {t.unitPrice}</div>)}</div>; }
