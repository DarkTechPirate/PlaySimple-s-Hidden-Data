import { Lightbulb } from 'lucide-react';

export default function InsightBox({ text, label = 'Strategic Insight' }) {
    return (
        <div className="insight-box">
            <Lightbulb className="insight-icon" />
            <div>
                <div className="insight-label">{label}</div>
                <p>{text}</p>
            </div>
        </div>
    );
}
