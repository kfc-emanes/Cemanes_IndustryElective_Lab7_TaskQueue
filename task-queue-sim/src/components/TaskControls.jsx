export default function TaskControls({
  onAddRandomTask,
  onAdmitTask,
  onClearAll,
}) {
  return (
    <div className="controls-group">
      <button type="button" className="btn btn-primary" onClick={onAddRandomTask}>
        ADD RANDOM TASK
      </button>
      <button type="button" className="btn btn-primary" onClick={onAdmitTask}>
        ADMIT TASK
      </button>
      <button type="button" className="btn btn-secondary" onClick={onClearAll}>
        CLEAR
      </button>
    </div>
  );
}