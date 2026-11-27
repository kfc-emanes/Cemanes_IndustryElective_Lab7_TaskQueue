import TaskItem from './TaskItem';

export default function WaitingQueue({ waitingTasks }) {
  const highCount = waitingTasks.filter((t) => t.priority === 'HIGH').length;
  const regularCount = waitingTasks.length - highCount;

  return (
    <div className="waiting-section">
      <div className="waiting-header">
        <h2>Task Queue</h2>
        <span className="derived-counts">
          Waiting: <strong>{waitingTasks.length}</strong> (High: {highCount} | Regular: {regularCount})
        </span>
      </div>

      <div className="waiting-list">
        {waitingTasks.length === 0 ? (
          <p className="empty-hint">No tasks waiting. Add a random task.</p>
        ) : (
          waitingTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}