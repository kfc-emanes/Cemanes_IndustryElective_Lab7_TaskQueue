import { useState } from 'react';
import TaskControls from './components/TaskControls';
import WaitingQueue from './components/WaitingQueue';
import ServiceQueue from './components/ServiceQueue';
import './App.css';

// This is specifically for the checks to change the probability of high priority queue numbers
// appearing
const HIGH_PRIORITY_PROBABILITY = 0.3;

const INITIAL_REGULAR_QUEUES = [
  { id: 2, title: 'Regular Queue 2', tasks: [] },
  { id: 3, title: 'Regular Queue 3', tasks: [] },
  { id: 4, title: 'Regular Queue 4', tasks: [] },
];

const getTotalDuration = (tasks) =>
  tasks.reduce((sum, task) => sum + task.duration, 0);

export default function App() {
  const [waitingTasks, setWaitingTasks] = useState([]);
  const [highPriorityQueue, setHighPriorityQueue] = useState([]);
  const [regularQueues, setRegularQueues] = useState(INITIAL_REGULAR_QUEUES);
  const [nextTaskId, setNextTaskId] = useState(1);

  // Append a new task immutably
  const handleAddRandomTask = () => {
    const duration = Math.floor(Math.random() * 171) + 20; // 20 to 190
    const priority = Math.random() < HIGH_PRIORITY_PROBABILITY ? 'HIGH' : 'REGULAR';

    const newTask = {
      id: nextTaskId,
      duration,
      priority,
    };

    setWaitingTasks((prev) => [...prev, newTask]);
    setNextTaskId((prevId) => prevId + 1);
  };

  // Admit earliest HIGH task first, but otherwise earliest REGULAR task (epic FIFO)
  const handleAdmitTask = () => {
    if (waitingTasks.length === 0) return;

    const highIndex = waitingTasks.findIndex((t) => t.priority === 'HIGH');
    const selectedIndex = highIndex !== -1 ? highIndex : 0;
    const selectedTask = waitingTasks[selectedIndex];

    // Removes the selected task immutably
    setWaitingTasks((prev) => prev.filter((_, idx) => idx !== selectedIndex));

    if (selectedTask.priority === 'HIGH') {
      setHighPriorityQueue((prev) => [...prev, selectedTask]);
      return;
    }

    // Dispatch REGULAR task to the least-loaded queue.
    // In the case of tie breakers, lower queue id/index
    setRegularQueues((prevQueues) => {
      let targetIdx = 0;
      let minLoad = getTotalDuration(prevQueues[0].tasks);

      for (let i = 1; i < prevQueues.length; i++) {
        const load = getTotalDuration(prevQueues[i].tasks);
        if (load < minLoad) {
          minLoad = load;
          targetIdx = i;
        }
      }

      return prevQueues.map((queue, idx) =>
        idx === targetIdx
          ? { ...queue, tasks: [...queue.tasks, selectedTask] }
          : queue
      );
    });
  };

  const handleClearAll = () => {
    setWaitingTasks([]);
    setHighPriorityQueue([]);
    setRegularQueues(INITIAL_REGULAR_QUEUES);
  };

  return (
    <div className="sim-container">
      {/* Left Region: Controls & Waiting Tasks */}
      <section className="left-pane">
        <TaskControls
          onAddRandomTask={handleAddRandomTask}
          onAdmitTask={handleAdmitTask}
          onClearAll={handleClearAll}
          isWaitingEmpty={waitingTasks.length === 0}
        />
        <WaitingQueue waitingTasks={waitingTasks} />
      </section>

      {/* Right Region: 1 High Priority Queue and 3 Regular Queues */}
      <section className="right-pane">
        <ServiceQueue
          title="High Priority Queue 1"
          tasks={highPriorityQueue}
          type="HIGH"
        />

        {regularQueues.map((queue) => (
          <ServiceQueue
            key={queue.id}
            title={queue.title}
            tasks={queue.tasks}
            type="REGULAR"
          />
        ))}
      </section>
    </div>
  );
}