export default function QueueDuration({ tasks }) {
  const totalDuration = tasks.reduce(
    (sum, task) => sum + (task.remaining ?? task.duration),
    0
  );
  const barWidth = Math.min(totalDuration * 0.5, 100);

  return (
    <div className="duration-section">
      <div className="duration-label">
        Duration: <strong>{totalDuration}</strong>
      </div>
      <div className="duration-track">
        {totalDuration > 0 && (
          <div
            className="duration-bar"
            style={{ width: `${Math.max(barWidth, 2)}%` }}
          />
        )}
      </div>
    </div>
  );
}