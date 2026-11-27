export default function QueueDuration({ tasks }) {
  const totalDuration = tasks.reduce((sum, task) => sum + task.duration, 0);
  const barWidth = Math.min(totalDuration * 0.6, 100); // scales proportionally up to 100%

  return (
    <div className="duration-section">
      <div className="duration-label">
        Duration: <strong>{totalDuration}</strong>
      </div>
      <div className="duration-track">
        {totalDuration > 0 && (
          <div
            className="duration-bar"
            style={{ width: `${Math.max(barWidth, 4)}%` }}
          />
        )}
      </div>
    </div>
  );
}