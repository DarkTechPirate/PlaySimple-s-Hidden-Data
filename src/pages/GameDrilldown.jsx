import { useParams, Link } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, Legend,
} from 'recharts';
import { ChevronRight, Crosshair, Shield, Zap, DollarSign } from 'lucide-react';
import { games, cohortLabels, cohortWeeks } from '../data';
import InsightBox from '../components/InsightBox';

const CHART_COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const tooltipStyle = {
    contentStyle: {
        background: '#ffffff',
        border: '1px solid rgba(15,23,42,0.1)',
        borderRadius: '8px',
        color: '#0f172a',
        fontSize: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    },
    labelStyle: { color: '#475569' },
};

function getCellColor(value) {
    if (value >= 80) return '#16a34a';
    if (value >= 40) return '#059669';
    if (value >= 25) return '#0891b2';
    if (value >= 15) return '#4f46e5';
    if (value >= 10) return '#7c3aed';
    return '#cbd5e1';
}

export default function GameDrilldown() {
    const { id } = useParams();
    const game = games.find((g) => g.id === id);

    if (!game) {
        return (
            <div>
                <h2>Game not found</h2>
                <Link to="/">← Back to Portfolio</Link>
            </div>
        );
    }

    const cpiData = game.cpiByChannel.filter((c) => c.cpi > 0);
    const pieData = [
        { name: 'Ad Revenue', value: game.adRevenuePct },
        { name: 'IAP Revenue', value: game.iapRevenuePct },
    ];

    const revenueDistribution = [
        { segment: 'Top 1%', revenue: Math.round(game.topUserRevenue * 0.45) },
        { segment: 'Top 5%', revenue: Math.round(game.topUserRevenue * 0.75) },
        { segment: 'Top 10%', revenue: game.topUserRevenue },
        { segment: 'Top 25%', revenue: Math.round(game.topUserRevenue * 1.12) },
        { segment: 'Top 50%', revenue: Math.round(game.topUserRevenue * 1.25) },
        { segment: 'All', revenue: 100 },
    ];

    return (
        <div>
            {/* Breadcrumb */}
            <div className="page-breadcrumb">
                <Link to="/">Portfolio</Link>
                <ChevronRight size={12} />
                <span style={{ color: game.color }}>{game.name}</span>
            </div>

            {/* Header */}
            <div className="drilldown-header animate-in">
                <span
                    className="drilldown-header-icon"
                    style={{ background: `${game.color}18`, border: `1px solid ${game.color}30` }}
                >
                    {game.icon}
                </span>
                <div className="drilldown-header-info">
                    <h2>{game.name}</h2>
                    <span>{game.category} · {game.monetization} Monetization</span>
                </div>
            </div>

            {/* Mini KPIs */}
            <div className="drilldown-kpis">
                <div className="metric-mini animate-in animate-delay-1">
                    <div className="metric-mini-label">Revenue</div>
                    <div className="metric-mini-value">{game.revenue}</div>
                </div>
                <div className="metric-mini animate-in animate-delay-2">
                    <div className="metric-mini-label">Downloads</div>
                    <div className="metric-mini-value">{game.downloads}</div>
                </div>
                <div className="metric-mini animate-in animate-delay-3">
                    <div className="metric-mini-label">D1 Retention</div>
                    <div className="metric-mini-value">{game.d1}%</div>
                </div>
                <div className="metric-mini animate-in animate-delay-4">
                    <div className="metric-mini-label">ARPDAU</div>
                    <div className="metric-mini-value">${game.arpdau.toFixed(2)}</div>
                </div>
                <div className="metric-mini animate-in animate-delay-5">
                    <div className="metric-mini-label">ROAS</div>
                    <div className="metric-mini-value">{game.roas}x</div>
                </div>
            </div>

            {/* ===== SECTION A: ACQUISITION ===== */}
            <div className="drilldown-section">
                <div className="section-header">
                    <Crosshair size={18} />
                    <h3>Acquisition Intelligence</h3>
                    <span className="section-badge">UA Analytics</span>
                </div>

                <div className="chart-row-3">
                    <div className="chart-panel animate-in animate-delay-1">
                        <div className="chart-panel-header">
                            <span className="chart-panel-title">CPI by Channel</span>
                            <span className="chart-panel-badge">Cost</span>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={cpiData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
                                <XAxis dataKey="channel" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickFormatter={(v) => `$${v}`} />
                                <Tooltip {...tooltipStyle} />
                                <Bar dataKey="cpi" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-panel animate-in animate-delay-2">
                        <div className="chart-panel-header">
                            <span className="chart-panel-title">LTV by Channel</span>
                            <span className="chart-panel-badge">Lifetime Value</span>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={game.cpiByChannel}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
                                <XAxis dataKey="channel" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickFormatter={(v) => `$${v}`} />
                                <Tooltip {...tooltipStyle} />
                                <Bar dataKey="ltv" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-panel animate-in animate-delay-3">
                        <div className="chart-panel-header">
                            <span className="chart-panel-title">ROAS by Channel</span>
                            <span className="chart-panel-badge">Returns</span>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={cpiData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
                                <XAxis dataKey="channel" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickFormatter={(v) => `${v}x`} />
                                <Tooltip {...tooltipStyle} />
                                <Bar dataKey="roas" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <InsightBox text={game.insights.acquisition} label="Acquisition Insight" />
            </div>

            {/* ===== SECTION B: RETENTION ===== */}
            <div className="drilldown-section">
                <div className="section-header">
                    <Shield size={18} />
                    <h3>Retention Intelligence</h3>
                    <span className="section-badge">Lifecycle Analysis</span>
                </div>

                <div className="chart-row">
                    <div className="chart-panel animate-in animate-delay-1">
                        <div className="chart-panel-header">
                            <span className="chart-panel-title">D1 / D7 / D30 Retention</span>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart
                                data={[
                                    { label: 'D1', value: game.d1 },
                                    { label: 'D7', value: game.d7 },
                                    { label: 'D30', value: game.d30 },
                                ]}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
                                <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickFormatter={(v) => `${v}%`} />
                                <Tooltip {...tooltipStyle} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {[0, 1, 2].map((i) => (
                                        <Cell key={i} fill={CHART_COLORS[i]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-panel animate-in animate-delay-2">
                        <div className="chart-panel-header">
                            <span className="chart-panel-title">Retention Decay Curve</span>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={game.retentionCurve}>
                                <defs>
                                    <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
                                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickFormatter={(v) => `D${v}`} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickFormatter={(v) => `${v}%`} />
                                <Tooltip {...tooltipStyle} />
                                <Area type="monotone" dataKey="rate" stroke="#6366f1" fill="url(#retGrad)" strokeWidth={2} dot={{ fill: '#6366f1', r: 4 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Cohort Heatmap */}
                <div className="chart-panel animate-in animate-delay-3" style={{ marginBottom: '16px' }}>
                    <div className="chart-panel-header">
                        <span className="chart-panel-title">Cohort Retention Heatmap</span>
                        <span className="chart-panel-badge">Weekly Cohorts</span>
                    </div>
                    <table className="cohort-heatmap">
                        <thead>
                            <tr>
                                <th></th>
                                {cohortLabels.map((l) => <th key={l}>{l}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {game.cohortHeatmap.map((row, ri) => (
                                <tr key={ri}>
                                    <td style={{ textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: '0.7rem' }}>
                                        {cohortWeeks[ri]}
                                    </td>
                                    {row.map((val, ci) => (
                                        <td
                                            key={ci}
                                            style={{
                                                background: getCellColor(val),
                                                color: val >= 15 ? 'white' : '#94a3b8',
                                                opacity: 0.85 + (val / 100) * 0.15,
                                            }}
                                        >
                                            {val}%
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <InsightBox text={game.insights.retention} label="Retention Insight" />
            </div>

            {/* ===== SECTION C: ENGAGEMENT ===== */}
            <div className="drilldown-section">
                <div className="section-header">
                    <Zap size={18} />
                    <h3>Engagement Intelligence</h3>
                    <span className="section-badge">Session Analytics</span>
                </div>

                <div className="chart-row">
                    <div className="chart-panel animate-in animate-delay-1">
                        <div className="chart-panel-header">
                            <span className="chart-panel-title">Session Metrics</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '20px 0' }}>
                            <div className="metric-mini">
                                <div className="metric-mini-label">Avg Session Length</div>
                                <div className="metric-mini-value">{game.avgSession} min</div>
                            </div>
                            <div className="metric-mini">
                                <div className="metric-mini-label">Sessions / Day</div>
                                <div className="metric-mini-value">{game.sessionsPerDay}</div>
                            </div>
                        </div>
                    </div>

                    <div className="chart-panel animate-in animate-delay-2">
                        <div className="chart-panel-header">
                            <span className="chart-panel-title">Level Completion Funnel</span>
                        </div>
                        <div className="funnel-container" style={{ padding: '12px 0' }}>
                            {game.levelFunnel.map((step, i) => (
                                <div key={step.level} className="funnel-step">
                                    <span className="funnel-label">{step.level}</span>
                                    <div className="funnel-bar-wrapper">
                                        <div
                                            className="funnel-bar"
                                            style={{
                                                width: `${step.users}%`,
                                                background: `linear-gradient(90deg, ${CHART_COLORS[i]}, ${CHART_COLORS[i]}cc)`,
                                            }}
                                        >
                                            <span>{step.users}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <InsightBox text={game.insights.engagement} label="Engagement Insight" />
            </div>

            {/* ===== SECTION D: MONETIZATION ===== */}
            <div className="drilldown-section">
                <div className="section-header">
                    <DollarSign size={18} />
                    <h3>Monetization Intelligence</h3>
                    <span className="section-badge">Revenue Analytics</span>
                </div>

                <div className="chart-row">
                    <div className="chart-panel animate-in animate-delay-1">
                        <div className="chart-panel-header">
                            <span className="chart-panel-title">Revenue Metrics</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', paddingTop: '12px' }}>
                            <div className="metric-mini">
                                <div className="metric-mini-label">ARPU</div>
                                <div className="metric-mini-value">${game.arpu.toFixed(2)}</div>
                            </div>
                            <div className="metric-mini">
                                <div className="metric-mini-label">ARPDAU</div>
                                <div className="metric-mini-value">${game.arpdau.toFixed(2)}</div>
                            </div>
                            <div className="metric-mini">
                                <div className="metric-mini-label">Payer Conv.</div>
                                <div className="metric-mini-value">{game.payerConversion}%</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={80}
                                        dataKey="value"
                                        strokeWidth={0}
                                    >
                                        <Cell fill="#6366f1" />
                                        <Cell fill="#06b6d4" />
                                    </Pie>
                                    <Tooltip {...tooltipStyle} formatter={(v) => `${v}%`} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="pie-legend">
                                <div className="pie-legend-item">
                                    <span className="pie-legend-dot" style={{ background: '#6366f1' }}></span>
                                    Ad Revenue ({game.adRevenuePct}%)
                                </div>
                                <div className="pie-legend-item">
                                    <span className="pie-legend-dot" style={{ background: '#06b6d4' }}></span>
                                    IAP Revenue ({game.iapRevenuePct}%)
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="chart-panel animate-in animate-delay-2">
                        <div className="chart-panel-header">
                            <span className="chart-panel-title">Revenue Distribution Curve</span>
                            <span className="chart-panel-badge">Whale Analysis</span>
                        </div>
                        <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={revenueDistribution}>
                                <defs>
                                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
                                <XAxis dataKey="segment" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickFormatter={(v) => `${v}%`} />
                                <Tooltip {...tooltipStyle} formatter={(v) => `${v}%`} />
                                <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fill="url(#revGrad)" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                        <div style={{ textAlign: 'center', marginTop: '8px' }}>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                Top 10% of users generate <strong style={{ color: '#f59e0b' }}>{game.topUserRevenue}%</strong> of total revenue
                            </span>
                        </div>
                    </div>
                </div>

                <InsightBox text={game.insights.monetization} label="Monetization Insight" />
            </div>
        </div>
    );
}
