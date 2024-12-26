"use client";

import { Task } from "@/app/types/taskType";
import TaskCard from "@/components/TaskCard";
import API_ROUTES from "@/constants/api";

type Props = {
  taskList: Task[];
  updateTaskList: (data: Task[]) => void;
};

const TaskCards: React.FC<Props> = ({ taskList, updateTaskList }) => {
  const handleDeleteTask = async (id: number) => {
    try {
      await fetch(`${API_ROUTES.TASKS}/${id}`, {
        method: "DELETE",
      });
      const updatedTaskList = await fetch(API_ROUTES.TASKS);
      const data = await updatedTaskList.json();
      updateTaskList(data);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCompleteTask = async (payload: Task) => {
    try {
      await fetch(`${API_ROUTES.TASKS}/${payload.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(payload),
      });
      const updatedTaskList = await fetch(API_ROUTES.TASKS);
      const data = await updatedTaskList.json();
      updateTaskList(data);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };
  return (
    <>
      {taskList.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          completeTask={handleCompleteTask}
          deleteTask={handleDeleteTask}
        />
      ))}
    </>
  );
};

export default TaskCards;
