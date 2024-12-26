"use client";

import {
  faArrowLeft,
  faCheck,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { Task } from "@/app/types/taskType";
import { useRouter } from "next/navigation";
import API_ROUTES from "@/constants/api";

interface TaskFormProps {
  task?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ task }) => {
  const router = useRouter();
  const colors = {
    red: "bg-red-600",
    orange: "bg-orange-600",
    yellow: "bg-red-300",
    green: "bg-green-600",
    blue: "bg-blue-600",
    indigo: "bg-indigo-600",
    purple: "bg-purple-600",
    pink: "bg-pink-600",
    brown: "bg-yellow-800",
  };

  const MAPPED_COLORS_LIST_BY_COLOR_NAME_CODE = Object.entries(colors);

  const [formState, setFormState] = useState({
    title: task?.title || "",
    color: task?.color || "",
    is_Completed: task?.is_Completed || false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.title.trim()) {
      alert("Title is required.");
      return;
    }

    setIsLoading(true);

    const url = task ? `${API_ROUTES.TASKS}/${task.id}` : API_ROUTES.TASKS;
    const method = task ? "PUT" : "POST";
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    setIsLoading(false);

    if (response.ok) {
      alert(task ? "Task updated successfully!" : "Task added successfully!");
      router.push("/");
    } else {
      alert("Failed to save the task.");
    }
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-row p-4 justify-center items-center self-center w-full">
        <form
          onSubmit={handleSubmit}
          className="h-full flex flex-col justify-center w-2/3"
        >
          <div>
            <Link href="/">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-white mb-10"
              />
            </Link>
            <div className="mb-2 flex flex-col mb-10">
              <label
                htmlFor="title"
                className="text-2xl text-blue-400 font-medium mb-4"
              >
                Title
              </label>
              <input
                className="border-2 rounded h-10 px-2"
                type="text"
                id="title"
                name="title"
                value={formState.title}
                onChange={handleChange}
                required
                placeholder="Ex: Brush your teeth"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="color"
              className="text-2xl text-blue-400 font-medium mb-4"
            >
              Color
            </label>
            <div className="flex flex-row mb-10 flex-wrap">
              {MAPPED_COLORS_LIST_BY_COLOR_NAME_CODE.map(
                ([colorName, colorStyle]) => (
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 
                    rounded-full cursor-pointer mr-3 ${colorStyle} ${
                      formState.color === colorName
                        ? "border-white border-2"
                        : ""
                    }`}
                    key={colorName}
                    onClick={() =>
                      setFormState({
                        ...formState,
                        color: colorName,
                      })
                    }
                  />
                )
              )}
            </div>
          </div>
          <button
            className="bg-blue-400 p-2 rounded text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              "Saving..."
            ) : task ? (
              <span>
                Save
                <FontAwesomeIcon icon={faCheck} className="ml-2" />
              </span>
            ) : (
              <span>
                Add Task
                <FontAwesomeIcon icon={faCirclePlus} className="ml-2" />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
