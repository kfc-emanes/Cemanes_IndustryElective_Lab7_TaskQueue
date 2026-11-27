import TaskItem from './TaskItem';
import QueueDuration from './QueueDuration';

export default function ServiceQueue({ title, tasks, type }) {
  return (
    <div className={`service-card ${type === 'HIGH' ? 'service-high' : ''}`}>
      <h3 className="service-title">{title}</h3>

      <div className="queue-list-label">Queue List:</div>
      <div className="queue-list">
        {tasks.length === 0 ? (
          <span className="empty-slot">—</span>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>

      <QueueDuration tasks={tasks} />
    </div>
  );
}