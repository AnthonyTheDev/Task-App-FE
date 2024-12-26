import TaskForm from "@/components/forms/TaskForm";
import API_ROUTES from "@/constants/api";

export async function generateStaticParams() {
  try {
    const tasks = await fetch(API_ROUTES.TASKS).then((res) => res.json());
    return tasks.map((task: { id: number }) => ({
      id: String(task.id),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

const findTaskByID = async (id: string) => {
  try {
    const response = await fetch(`${API_ROUTES.TASKS}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch task");
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type PageProps = {
  params: Promise<{ id: string }>;
};

const EditTask = async ({ params }: PageProps) => {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const task = await findTaskByID(id);
    return <TaskForm task={task} />;
  } catch (error) {
    console.error("Error loading task:", error);
    return <div>Error loading task</div>;
  }
};

export default EditTask;
