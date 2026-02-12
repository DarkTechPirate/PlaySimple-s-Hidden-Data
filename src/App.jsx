import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PortfolioOverview from './pages/PortfolioOverview';
import GameDrilldown from './pages/GameDrilldown';
import GrowthSimulator from './pages/GrowthSimulator';
import StrategicDiagnosis from './pages/StrategicDiagnosis';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<PortfolioOverview />} />
            <Route path="/game/:id" element={<GameDrilldown />} />
            <Route path="/simulator" element={<GrowthSimulator />} />
            <Route path="/strategy" element={<StrategicDiagnosis />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
