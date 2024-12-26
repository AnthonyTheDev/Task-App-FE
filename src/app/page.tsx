import { TaskHome } from "@/components/TaskHome";
import { Task } from "./types/taskType";
import API_ROUTES from "@/constants/api";
import { ReactElement } from "react";

export default async function Home() {
  const allTask = await getAllTask();

  return allTask ? (
    <TaskHome allTask={allTask} />
  ) : (
    <div className="text-white text-center">Error loading tasks</div>
  );
}

async function getAllTask(): Promise<Task[] | null> {
  try {
    const res = await fetch(API_ROUTES.TASKS);
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching tasks");
    return null;
  }
}
