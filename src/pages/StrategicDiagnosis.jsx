import { Brain, AlertTriangle, Rocket, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { strategicDiagnosis, interviewDefense } from '../data';
import { useState } from 'react';

export default function StrategicDiagnosis() {
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    return (
        <div>
            <div className="page-header">
                <h2>Strategic Diagnosis</h2>
                <p>Portfolio-level growth constraint analysis and prioritized action framework</p>
            </div>

            {/* Primary Growth Constraint */}
            <div className="strategy-constraint animate-in animate-delay-1">
                <div className="strategy-constraint-label">
                    <AlertTriangle size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                    Primary Growth Constraint Identified
                </div>
                <h3>{strategicDiagnosis.primaryConstraint}</h3>
                <ul className="strategy-reasons">
                    {strategicDiagnosis.reasoning.map((reason, i) => (
                        <li key={i}>{reason}</li>
                    ))}
                </ul>
            </div>

            {/* Growth Priorities */}
            <div className="section-header">
                <Rocket size={18} />
                <h3>Top Growth Priorities</h3>
                <span className="section-badge">Action Items</span>
            </div>

            <div className="priorities-grid">
                {strategicDiagnosis.priorities.map((priority, i) => (
                    <div key={i} className={`priority-card animate-in animate-delay-${i + 1}`}>
                        <div className="priority-number">{i + 1}</div>
                        <h4>{priority.title}</h4>
                        <p>{priority.description}</p>
                        <div className="priority-tags">
                            <span className={`priority-tag impact-${priority.impact.toLowerCase()}`}>
                                Impact: {priority.impact}
                            </span>
                            <span className={`priority-tag effort-${priority.effort.toLowerCase()}`}>
                                Effort: {priority.effort}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Expected Revenue Lift */}
            <div className="revenue-lift-banner animate-in animate-delay-4" style={{ marginBottom: '40px' }}>
                <div className="revenue-lift-label">Expected Portfolio Revenue Lift</div>
                <div className="revenue-lift-value">{strategicDiagnosis.expectedLift}</div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '8px' }}>
                    Based on combined impact of all three priority initiatives over 6-month horizon
                </p>
            </div>

            {/* Interview Defense Mode */}
            <div className="section-header">
                <MessageSquare size={18} />
                <h3>Interview Defense Mode</h3>
                <span className="section-badge">Talking Points</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {interviewDefense.map((item, i) => (
                    <div
                        key={i}
                        className={`chart-panel animate-in animate-delay-${Math.min(i + 1, 6)}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: 'rgba(99,102,241,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    color: '#6366f1',
                                    flexShrink: 0,
                                }}>
                                    Q{i + 1}
                                </span>
                                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f1f5f9' }}>
                                    {item.question}
                                </span>
                            </div>
                            {expandedFAQ === i ? <ChevronUp size={16} style={{ color: '#64748b' }} /> : <ChevronDown size={16} style={{ color: '#64748b' }} />}
                        </div>

                        {expandedFAQ === i && (
                            <div style={{
                                marginTop: '14px',
                                paddingTop: '14px',
                                borderTop: '1px solid rgba(148,163,184,0.08)',
                                fontSize: '0.85rem',
                                color: '#94a3b8',
                                lineHeight: '1.7',
                            }}>
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
