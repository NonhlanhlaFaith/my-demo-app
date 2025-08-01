import React from 'react';
import TaskItem from './TaskItem';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskList({ tasks, toggleTaskDone, deleteTask, editTask }) {
  if (tasks.length === 0) return <p>No tasks to display.</p>;

  return (
    <ul className="list-group">
      <AnimatePresence>
        {tasks.map(task => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ listStyleType: 'none' }} // Remove bullet if needed
          >
            <TaskItem
              task={task}
              toggleTaskDone={toggleTaskDone}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
