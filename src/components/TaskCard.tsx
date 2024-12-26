"use client";
import { Task } from "@/app/types/taskType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ROUTES from "@/routes/routes";

interface IProps {
  task: Task;
  deleteTask: (id: number) => void;
  completeTask: (payload: Task) => void;
}

const TaskCard: React.FC<IProps> = ({ task, deleteTask, completeTask }) => {
  return (
    <div className="flex flex-row w-2/3 rounded m-2 max-h-96 sm:max-h-full bg-gray-700 px-4">
      <div className="flex w-full justify-center p-4">
        <span className="flex flex-col items-end items-start max-h-full justify-center">
          <input
            type="checkbox"
            checked={task.is_Completed}
            onChange={({ target }) => {
              completeTask({
                ...task,
                id: task.id,
                is_Completed: target.checked,
                completed_Dated: target.checked
                  ? new Date().toISOString()
                  : null,
              });
            }}
          />
        </span>
        <Link href={`${ROUTES.CREATE_EDIT_TASK}/${task.id}`} className="w-full">
          <span className="flex justify-start w-full px-4 text-white">
            {task.title}
          </span>
        </Link>
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation();
          deleteTask(task.id);
        }}
      >
        <FontAwesomeIcon icon={faTrash} className="text-red-600" />
      </button>
    </div>
  );
};

export default TaskCard;
