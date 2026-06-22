import '../styles/Features.css'
import '../styles/HowItWorks.css'
import { IconZap, IconLink, IconBarChart, IconShield, IconClock, IconClipboard } from './common/Icons'

const features = [
    {
        icon: <IconZap />,
        title: 'Create in seconds',
        desc: 'Build polls with multiple questions and options. Set expiry, toggle anonymous voting — launch in under a minute. No setup, no config, just create and share.'
    },
    {
        icon: <IconLink />,
        title: 'Share anywhere',
        desc: 'Send a link. Voters need no account if you allow anonymous responses.'
    },
    {
        icon: <IconBarChart />,
        title: 'Live analytics',
        desc: 'Watch results update in real time via WebSocket. Per-question breakdowns as they happen.'
    },
    {
        icon: <IconShield />,
        title: 'Auth or anonymous',
        desc: 'Require login for accountability, or allow anonymous votes for unfiltered feedback.'
    },
    {
        icon: <IconClock />,
        title: 'Built-in expiry',
        desc: 'Polls auto-close after minutes, hours, or days — no manual work needed.'
    },
    {
        icon: <IconClipboard />,
        title: 'Multi-question polls',
        desc: 'Add as many questions as you need. Each tracks votes independently with full analytics — all in one shareable link, all visible in one dashboard.'
    }
]

export default function Features() {
    return (
        <section className="features-section">
            <div className="container">
                <div className="section-label">Features</div>
                <h2 className="section-title">Everything you need to run great polls</h2>
                <div className="features-bento">
                    {features.map((f, i) => {
                        const isWide = i === 0 || i === 5
                        return (
                            <div
                                className={`feature-card ${isWide ? 'feature-card--wide' : ''}`}
                                key={f.title}
                            >
                                <span className="feature-icon">{f.icon}</span>
                                <h3 className="feature-card-title">{f.title}</h3>
                                <p className="feature-card-desc">{f.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
