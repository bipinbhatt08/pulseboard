import '../styles/HowItWorks.css'
import { IconEdit, IconLink, IconBarChart } from './common/Icons'

const steps = [
    {
        number: '01',
        icon: <IconEdit />,
        title: 'Create your poll',
        desc: 'Set a title, add questions and options, configure expiry and privacy — all in under a minute.'
    },
    {
        number: '02',
        icon: <IconLink />,
        title: 'Share the link',
        desc: 'Send a single link. No account needed if you allow anonymous responses — zero friction for voters.'
    },
    {
        number: '03',
        icon: <IconBarChart />,
        title: 'Watch results live',
        desc: 'Results update in real time via WebSocket. Per-question breakdowns and percentages as they happen.'
    }
]

export default function HowItWorks() {
    return (
        <section className="hiw-section">
            <div className="container">
                <div className="section-label">How it works</div>
                <h2 className="section-title">Three steps to better decisions</h2>

                <div className="hiw-steps">
                    {steps.map((step) => (
                        <div className="hiw-step" key={step.number}>
                            <div className="hiw-top">
                                <span className="hiw-step-num">Step {step.number}</span>
                                <div className="hiw-circle">
                                    {step.icon}
                                </div>
                            </div>
                            <div className="hiw-body">
                                <h3 className="hiw-step-title">{step.title}</h3>
                                <p className="hiw-step-desc">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
