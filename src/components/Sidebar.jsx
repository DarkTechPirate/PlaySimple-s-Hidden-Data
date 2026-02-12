import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Target, Sliders, Brain, BarChart3 } from 'lucide-react';
import { games } from '../data';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <h1>PlaySimple Portfolio Growth Intelligence</h1>
                <p>Market-Simulated Analytics</p>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard />
                    Portfolio Overview
                </NavLink>
                <NavLink to="/simulator" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Sliders />
                    Growth Simulator
                </NavLink>
                <NavLink to="/strategy" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Brain />
                    Strategic Diagnosis
                </NavLink>

                <div className="sidebar-section-label">Game Intelligence</div>
                {games.map((game) => (
                    <NavLink
                        key={game.id}
                        to={`/game/${game.id}`}
                        className={({ isActive }) => `sidebar-game-link ${isActive ? 'active' : ''}`}
                    >
                        <span
                            className="sidebar-game-icon"
                            style={{ background: `${game.color}20` }}
                        >
                            {game.icon}
                        </span>
                        {game.name}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <p>v1.0 · Simulated Data · Feb 2026</p>
            </div>
        </aside>
    );
}
