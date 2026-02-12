import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KPICard({ label, value, delta, direction, delay = 0 }) {
    return (
        <div className={`kpi-card animate-in animate-delay-${delay}`}>
            <div className="kpi-label">{label}</div>
            <div className="kpi-value">{value}</div>
            <div className={`kpi-delta ${direction}`}>
                {direction === 'up' ? <TrendingUp /> : <TrendingDown />}
                {delta} MoM
            </div>
        </div>
    );
}
