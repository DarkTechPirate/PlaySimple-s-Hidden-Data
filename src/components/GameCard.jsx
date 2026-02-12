import { Link } from 'react-router-dom';

export default function GameCard({ game, delay = 0 }) {
    return (
        <Link
            to={`/game/${game.id}`}
            className={`game-card animate-in animate-delay-${delay}`}
            style={{ '--card-color': game.color }}
        >
            <div
                className="game-card-header"
                style={{
                    borderBottom: `1px solid ${game.color}15`,
                    paddingBottom: '16px',
                }}
            >
                <span
                    className="game-card-icon"
                    style={{ background: `${game.color}18`, border: `1px solid ${game.color}30` }}
                >
                    {game.icon}
                </span>
                <div className="game-card-info">
                    <h3>{game.name}</h3>
                    <span>{game.category}</span>
                </div>
            </div>

            <div className="game-card-metrics">
                <div className="game-metric">
                    <span className="game-metric-label">Revenue</span>
                    <span className="game-metric-value">{game.revenue}</span>
                </div>
                <div className="game-metric">
                    <span className="game-metric-label">Downloads</span>
                    <span className="game-metric-value">{game.downloads}</span>
                </div>
                <div className="game-metric">
                    <span className="game-metric-label">D1 Retention</span>
                    <span className="game-metric-value">{game.d1}%</span>
                </div>
                <div className="game-metric">
                    <span className="game-metric-label">ARPDAU</span>
                    <span className="game-metric-value">${game.arpdau.toFixed(2)}</span>
                </div>
                <div className="game-metric">
                    <span className="game-metric-label">ROAS</span>
                    <span className="game-metric-value">{game.roas}x</span>
                </div>
                <div className="game-metric">
                    <span className="game-metric-label">Monetization</span>
                    <span className="game-metric-value" style={{ fontSize: '0.85rem' }}>{game.monetization}</span>
                </div>
            </div>

            <span className="game-card-tag" style={{ background: `${game.color}15`, color: game.color }}>
                View Drilldown →
            </span>
        </Link>
    );
}
