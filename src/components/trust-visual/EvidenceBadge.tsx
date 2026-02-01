interface EvidenceBadgeProps {
  number: number | string;
  unit: string;
  label?: string;
}

export default function EvidenceBadge({
  number,
  unit,
  label,
}: EvidenceBadgeProps) {
  return (
    <div className="evidence-badge">
      <span className="evidence-badge__number">{number}</span>
      <span className="evidence-badge__unit">{unit}</span>
      {label && <span className="evidence-badge__label">{label}</span>}
    </div>
  );
}
