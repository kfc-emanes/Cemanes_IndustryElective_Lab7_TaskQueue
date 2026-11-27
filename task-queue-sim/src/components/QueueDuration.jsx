export default function QueueDuration({ tasks }) {
  const activeTask = tasks[0];
  const currentDuration = activeTask
    ? (activeTask.remaining ?? activeTask.duration)
    : 0;

  const barWidth = Math.min(currentDuration * 0.5, 100);

  return (
    <div className="duration-section">
      <div className="duration-label">
        Duration: <strong>{currentDuration}</strong>
      </div>
      <div className="duration-track">
        {currentDuration > 0 && (
          <div
            className="duration-bar"
            style={{ width: `${Math.max(barWidth, 2)}%` }}
          />
        )}
      </div>
    </div>
  );
}