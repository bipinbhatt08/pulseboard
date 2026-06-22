import { useEffect, useState } from "react";
import { pollService } from "../services/pollService";
import { Link, useNavigate } from "@tanstack/react-router";
import Loader from "./common/Loader.jsx";
import "../styles/Dashboard.css";
import { toast } from "react-toastify";
import { tokenStore } from "../services/tokenStore.js";
import socket from "../services/Socket.js";
import Navbar from "./Navbar.jsx";
import { IconCopy, IconExternalLink, IconBarChart } from "./common/Icons.jsx";

const StatCard = ({ label, value, color }) => (
  <div className="stat-card" style={{ '--stat-color': color }}>
    <span className="stat-value">{value}</span>
    <span className="stat-label">{label}</span>
  </div>
);

const OptionBar = ({ option }) => (
  <div className="option-bar">
    <div className="option-bar-header">
      <span className="option-bar-text">{option.optionText}</span>
      <div className="option-bar-stats">
        <span className="option-bar-votes">{option.votes} votes</span>
        <span className="option-bar-pct">{option.percentage}%</span>
      </div>
    </div>
    <div className="option-bar-track">
      <div className="option-bar-fill" style={{ width: `${option.percentage}%` }} />
    </div>
    <div className="option-bar-breakdown">
      <span>Auth {option.authenticatedVotes}</span>
      <span className="breakdown-sep">·</span>
      <span>Anon {option.anonymousVotes}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const user = tokenStore.getUser()
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [page, setPage] = useState(1)
  const [totalPolls, setTotalPolls] = useState(0)
  const LIMIT = 5
  const totalPages = Math.ceil(totalPolls / LIMIT)

  const isExpired = selectedPoll ? new Date() > new Date(selectedPoll.expiresAt) : false
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    const fetchPolls = async () => {
      setIsLoading(true)
      try {
        const offset = (page - 1) * LIMIT
        const res = await pollService.getMyPolls({ offset, limit: LIMIT })
        setPolls(res.data.polls);
        setTotalPolls(res.data.total)
      } catch (err) {
        toast.error(err.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPolls();
  }, [page]);

  useEffect(() => {
    if (!selectedPoll) return

    socket.on('connect', () => {
      socket.emit('join:poll', selectedPoll._id)
    })

    socket.on('vote:new', async () => {
      const res = await pollService.getPollAnylytics(selectedPoll._id)
      setAnalytics(res.data)
    })

    socket.connect()

    return () => {
      socket.off('connect')
      socket.off('vote:new')
      socket.disconnect()
    }
  }, [selectedPoll])

  const selectPoll = async (poll) => {
    setSelectedPoll(poll);
    setAnalytics(null);
    setIsAnalyticsLoading(true);
    try {
      const res = await pollService.getPollAnylytics(poll._id);
      setAnalytics(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load analytics");
    } finally {
      setIsAnalyticsLoading(false);
    }
  };

  const handlePublish = async (forceExpire = false) => {
    setPublishing(true);
    setShowPublishConfirm(false);
    try {
      await pollService.publishPoll(selectedPoll._id, forceExpire);
      setSelectedPoll(prev => ({ ...prev, isPublished: true }));
      setPolls(prev => prev.map(p =>
        p._id === selectedPoll._id ? { ...p, isPublished: true } : p
      ));
      toast.success(forceExpire ? "Poll closed and went live!" : "Poll went live!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to go live");
    } finally {
      setPublishing(false);
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/poll/${selectedPoll._id}`;
    navigator.clipboard?.writeText(url);
    toast.success("Poll link copied!");
  };

  if (isLoading) return <Loader text="Loading dashboard..." />;

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-inner">

          {/* Sidebar */}
          <aside className="dashboard-sidebar">
            <div className="sidebar-header">
              <h2 className="sidebar-title">My Polls</h2>
              <Link to="/poll/create" className="sidebar-create">+ New</Link>
            </div>
            <div className="sidebar-polls">
              {polls.map(poll => (
                <button
                  key={poll._id}
                  className={`sidebar-poll-item ${selectedPoll?._id === poll._id ? "sidebar-poll-item--active" : ""}`}
                  onClick={() => selectPoll(poll)}
                >
                  <span className="sidebar-poll-title">{poll.title}</span>
                  <div className="sidebar-poll-meta">
                    <span className={`sidebar-poll-status ${new Date() > new Date(poll.expiresAt) ? "status--expired" : "status--active"}`}>
                      {new Date() > new Date(poll.expiresAt) ? "Expired" : "Active"}
                    </span>
                    {poll.isPublished && (
                      <span className="sidebar-poll-live">
                        <span className="sidebar-live-dot" />Live
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="sidebar-pagination">
                <button
                  className="sidebar-page-btn"
                  onClick={() => setPage(p => p - 1)}
                  disabled={page === 1}
                >
                  ←
                </button>
                <span className="sidebar-page-info">{page} / {totalPages}</span>
                <button
                  className="sidebar-page-btn"
                  onClick={() => setPage(p => p + 1)}
                  disabled={page === totalPages}
                >
                  →
                </button>
              </div>
            )}
          </aside>

          {/* Main */}
          <main className="dashboard-main">
            {!selectedPoll && (
              <div className="dashboard-empty">
                <div className="dashboard-empty-icon">
                  <IconBarChart size={28} />
                </div>
                <p className="dashboard-empty-title">No poll selected</p>
                <p className="dashboard-empty-sub">Choose a poll from the sidebar to view its analytics</p>
              </div>
            )}

            {isAnalyticsLoading && <Loader text="Loading analytics..." />}

            {analytics && (
              <>
                {/* Poll header */}
                <div className="dashboard-poll-header">
                  <div>
                    <h1 className="dashboard-poll-title">{selectedPoll.title}</h1>
                    <p className="dashboard-poll-meta">
                      Created {new Date(selectedPoll.createdAt).toLocaleDateString()}
                      {' · '}
                      {selectedPoll.allowAnonymousResponse ? "Anonymous" : "Login Required"}
                      {' · '}
                      {isExpired ? "Expired" : "Active"}
                    </p>
                  </div>
                  <div className="dashboard-poll-actions">
                    <button className="btn-share" onClick={handleCopyLink}>
                      <IconCopy size={13} /> Copy Link
                    </button>
                    <Link to={`/poll/${selectedPoll._id}`} className="btn-share" target="_blank">
                      <IconExternalLink size={13} /> Preview
                    </Link>
                    {!selectedPoll.isPublished ? (
                      <button
                        className="btn-publish"
                        onClick={() => isExpired ? handlePublish(false) : setShowPublishConfirm(true)}
                        disabled={publishing}
                      >
                        <span className="btn-live-dot" />
                        {publishing ? "Going Live..." : "Go Live"}
                      </button>
                    ) : (
                      <span className="published-badge">
                        <span className="btn-live-dot" />Live
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="stats-row">
                  <StatCard label="Total Votes" value={analytics.totalVotes} color="var(--primary)" />
                  <StatCard label="Authenticated" value={analytics.authenticatedVotes} color="var(--success)" />
                  <StatCard label="Anonymous" value={analytics.annonymousVotes} color="var(--warning)" />
                  <StatCard label="Questions" value={analytics.questions.length} color="var(--text-secondary)" />
                </div>

                {/* Questions */}
                <div className="dashboard-questions">
                  {analytics.questions.map((q, index) => (
                    <div key={q.questionId} className="dashboard-question-card">
                      <div className="dashboard-question-header">
                        <span className="poll-question-number">Q{index + 1}</span>
                        <h3 className="dashboard-question-text">{q.questionText}</h3>
                        <span className="dashboard-question-votes">{q.totalVotes} votes</span>
                      </div>
                      <div className="dashboard-options">
                        {q.options.map(opt => (
                          <OptionBar key={opt.optionId} option={opt} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* Confirm modal */}
      {showPublishConfirm && (
        <div className="modal-overlay" onClick={() => setShowPublishConfirm(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Go Live?</h3>
            <p className="modal-sub">
              This poll is still active. Results will be visible to everyone.
              Do you want to stop accepting votes or keep them open?
            </p>
            <div className="modal-actions">
              <button className="modal-btn-cancel" onClick={() => setShowPublishConfirm(false)}>
                Cancel
              </button>
              <button className="modal-btn-cancel" onClick={() => handlePublish(false)}>
                Keep Votes Open
              </button>
              <button className="modal-btn-confirm" onClick={() => handlePublish(true)}>
                Close & Go Live
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
