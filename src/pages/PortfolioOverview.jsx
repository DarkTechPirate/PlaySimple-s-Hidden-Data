import KPICard from '../components/KPICard';
import GameCard from '../components/GameCard';
import { portfolioKPIs, games, dataSources } from '../data';
import { BarChart3 } from 'lucide-react';

export default function PortfolioOverview() {
    return (
        <div>
            <div className="page-header">
                <h2>Portfolio Overview</h2>
                <p>Growth intelligence across 6 casual word games · Data sourced from public reports</p>
            </div>

            {/* KPI Strip */}
            <div className="kpi-strip">
                {portfolioKPIs.map((kpi, i) => (
                    <KPICard
                        key={kpi.id}
                        label={kpi.label}
                        value={kpi.value}
                        delta={kpi.delta}
                        direction={kpi.direction}
                        delay={i + 1}
                    />
                ))}
            </div>

            {/* Portfolio Performance Grid */}
            <div className="section-header">
                <BarChart3 size={20} />
                <h3>Portfolio Performance</h3>
                <span className="section-badge">6 Active Titles</span>
            </div>

            <div className="game-grid">
                {games.map((game, i) => (
                    <GameCard key={game.id} game={game} delay={i + 1} />
                ))}
            </div>

            {/* Data Sources */}
            <div className="data-sources">
                <h4>Data Sources</h4>
                <ul>
                    {dataSources.map((src, i) => (
                        <li key={i}>{src}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
