// src/components/common/Loader.jsx

const Loader = ({ text = "Loading..." }) => {
    return (
        <div className="poll-center">
            <div className="verify-spinner" />
            <p className="poll-loading-text">{text}</p>
        </div>
    )
}

export default Loader