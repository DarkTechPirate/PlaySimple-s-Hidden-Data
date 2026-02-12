import { useState, useMemo } from 'react';
import { Sliders, TrendingUp, Zap, DollarSign, Target, ArrowRight } from 'lucide-react';

export default function GrowthSimulator() {
    const [d1Boost, setD1Boost] = useState(0);
    const [payerConv, setPayerConv] = useState(3.0);

    // Simulated outputs based on slider inputs
    const d1Outputs = useMemo(() => {
        const d30Lift = (d1Boost * 0.48).toFixed(1);
        const ltvLift = (d1Boost * 2.2).toFixed(0);
        const newRoas = (1.28 + d1Boost * 0.034).toFixed(2);
        const revenueLift = (d1Boost * 3.6).toFixed(1);
        return { d30Lift, ltvLift, newRoas, revenueLift };
    }, [d1Boost]);

    const payerOutputs = useMemo(() => {
        const convDelta = payerConv - 3.0;
        const revLift = (convDelta * 18).toFixed(0);
        const newArpdau = (0.14 + convDelta * 0.03).toFixed(2);
        const newArpu = (4.20 + convDelta * 1.40).toFixed(2);
        const roasLift = (convDelta * 8).toFixed(1);
        return { revLift, newArpdau, newArpu, roasLift };
    }, [payerConv]);

    return (
        <div>
            <div className="page-header">
                <h2>Growth Simulator</h2>
                <p>Model impact scenarios to quantify growth lever potential across the portfolio</p>
            </div>

            <div className="simulator-container">
                {/* Slider 1: D1 Retention Improvement */}
                <div className="simulator-panel animate-in animate-delay-1">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <Target size={20} style={{ color: '#6366f1' }} />
                        <h3>Retention Optimization Scenario</h3>
                    </div>
                    <p>Model the downstream impact of improving Day 1 retention across the portfolio.</p>

                    <div className="slider-group">
                        <div className="slider-label">
                            <span>D1 Retention Improvement</span>
                            <span className="slider-value">+{d1Boost}%</span>
                        </div>
                        <input
                            type="range"
                            className="simulator-slider"
                            min={0}
                            max={10}
                            step={0.5}
                            value={d1Boost}
                            onChange={(e) => setD1Boost(parseFloat(e.target.value))}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Baseline</span>
                            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>+10%</span>
                        </div>
                    </div>

                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                        Projected Impact
                    </div>

                    <div className="simulator-outputs">
                        <div className="sim-output">
                            <div className="sim-output-label">D30 Retention Lift</div>
                            <div className="sim-output-value">+{d1Outputs.d30Lift}%</div>
                        </div>
                        <div className="sim-output">
                            <div className="sim-output-label">LTV Increase</div>
                            <div className="sim-output-value">+{d1Outputs.ltvLift}%</div>
                        </div>
                        <div className="sim-output">
                            <div className="sim-output-label">Projected ROAS</div>
                            <div className="sim-output-value">{d1Outputs.newRoas}x</div>
                        </div>
                        <div className="sim-output">
                            <div className="sim-output-label">Revenue Lift</div>
                            <div className="sim-output-value">+{d1Outputs.revenueLift}%</div>
                        </div>
                    </div>

                    {d1Boost >= 5 && (
                        <div className="insight-box" style={{ marginTop: '16px' }}>
                            <Zap size={16} style={{ color: '#6366f1', flexShrink: 0 }} />
                            <div>
                                <div className="insight-label">High-Impact Scenario</div>
                                <p style={{ fontStyle: 'italic' }}>
                                    A {d1Boost}% D1 retention improvement would generate an estimated +{d1Outputs.revenueLift}% revenue uplift,
                                    equivalent to ~${(8.4 * parseFloat(d1Outputs.revenueLift) / 100).toFixed(1)}M additional monthly revenue.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Slider 2: Payer Conversion */}
                <div className="simulator-panel animate-in animate-delay-2">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <DollarSign size={20} style={{ color: '#10b981' }} />
                        <h3>Monetization Optimization Scenario</h3>
                    </div>
                    <p>Model the revenue impact of increasing payer conversion rates through bundle optimization.</p>

                    <div className="slider-group">
                        <div className="slider-label">
                            <span>Payer Conversion Rate</span>
                            <span className="slider-value">{payerConv.toFixed(1)}%</span>
                        </div>
                        <input
                            type="range"
                            className="simulator-slider"
                            min={2.0}
                            max={6.0}
                            step={0.1}
                            value={payerConv}
                            onChange={(e) => setPayerConv(parseFloat(e.target.value))}
                            style={{ '--slider-color': '#10b981' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>2.0%</span>
                            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>6.0%</span>
                        </div>
                    </div>

                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                        Projected Impact
                    </div>

                    <div className="simulator-outputs">
                        <div className="sim-output">
                            <div className="sim-output-label">Revenue Lift</div>
                            <div className="sim-output-value">{payerOutputs.revLift > 0 ? '+' : ''}{payerOutputs.revLift}%</div>
                        </div>
                        <div className="sim-output">
                            <div className="sim-output-label">Projected ARPDAU</div>
                            <div className="sim-output-value">${payerOutputs.newArpdau}</div>
                        </div>
                        <div className="sim-output">
                            <div className="sim-output-label">Projected ARPU</div>
                            <div className="sim-output-value">${payerOutputs.newArpu}</div>
                        </div>
                        <div className="sim-output">
                            <div className="sim-output-label">ROAS Improvement</div>
                            <div className="sim-output-value">{payerOutputs.roasLift > 0 ? '+' : ''}{payerOutputs.roasLift}%</div>
                        </div>
                    </div>

                    {payerConv >= 4.0 && (
                        <div className="insight-box" style={{ marginTop: '16px' }}>
                            <Zap size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                            <div>
                                <div className="insight-label" style={{ color: '#10b981' }}>Revenue Opportunity</div>
                                <p style={{ fontStyle: 'italic' }}>
                                    Achieving {payerConv.toFixed(1)}% payer conversion would unlock an estimated +{payerOutputs.revLift}% revenue,
                                    with ARPDAU reaching ${payerOutputs.newArpdau} — exceeding the word game category benchmark of $0.15.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Combined Impact Summary */}
            {(d1Boost > 0 || payerConv > 3.0) && (
                <div style={{ marginTop: '24px' }} className="animate-in">
                    <div className="revenue-lift-banner">
                        <div className="revenue-lift-label">Combined Projected Revenue Impact</div>
                        <div className="revenue-lift-value">
                            +{(parseFloat(d1Outputs.revenueLift) + parseFloat(payerOutputs.revLift > 0 ? payerOutputs.revLift : 0)).toFixed(0)}% Revenue
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '8px' }}>
                            ≈ ${((8.4 * (parseFloat(d1Outputs.revenueLift) + parseFloat(payerOutputs.revLift > 0 ? payerOutputs.revLift : 0)) / 100)).toFixed(1)}M additional monthly revenue
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
