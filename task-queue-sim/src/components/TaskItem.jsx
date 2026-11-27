export default function TaskItem({ task }) {
    const isHigh = task.priority === 'HIGH';

    return (
        <span
            className={`task-badge ${isHigh ? 'task-high' : 'task-regular'}`}
            title={`ID: ${task.id} | Priority: ${task.priority} | Duration: ${task.duration}`}
        >
        {task.duration}
        </span>
    );
}