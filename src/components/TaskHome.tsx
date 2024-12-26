"use client";

import TaskCards from "@/components/TaskCards";
import ROUTES from "@/routes/routes";
import Link from "next/link";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons/faClipboardList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Task } from "@/app/types/taskType";
import { useState } from "react";

interface IProps {
  allTask: Task[] | null;
}

export const TaskHome: React.FC<IProps> = ({ allTask }) => {
  const [listOfTask, setListOfTask] = useState(allTask);
  console.log(allTask);
  const numberOfCompletedTask = listOfTask?.filter(
    (task) => task.is_Completed
  ).length;
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-center mb-20">
        <Link
          href={ROUTES.CREATE_EDIT_TASK}
          className="bg-blue-500 text-white w-2/3 text-xl p-2 rounded text-center relative -top-5"
        >
          Create Task <FontAwesomeIcon icon={faCirclePlus} />
        </Link>
      </div>
      <div className="flex w-full justify-center mb-5">
        <div className="justify-between flex flex-row w-2/3">
          <div className="flex flex-row">
            <p className="text-blue-500 mr-2 font-bold">Tasks</p>
            <span className="text-white bg-gray-600 rounded px-1">
              {listOfTask?.length}
            </span>
          </div>
          <div className="flex flex-row">
            <p className="text-blue-500 mr-2 font-bold">Completed</p>
            <span className="text-white bg-gray-600 rounded px-1">
              {numberOfCompletedTask} of {listOfTask?.length}
            </span>
          </div>
        </div>
      </div>
      <hr className="w-2/3 self-center bg-gray-200 mb-5" />
      <div className="flex flex-col items-center">
        {listOfTask?.length ? (
          <TaskCards taskList={listOfTask} updateTaskList={setListOfTask} />
        ) : (
          <div className="flex flex-col items-center mt-10">
            <FontAwesomeIcon
              icon={faClipboardList}
              className="text-8xl mb-3 text-gray-600"
            />
            <p className="font-bold mb-3 text-gray-600">
              You dont have any tasks registered yet
            </p>
            <p className="mb-3 text-gray-600">
              Create tasks and organize your to-do items
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
