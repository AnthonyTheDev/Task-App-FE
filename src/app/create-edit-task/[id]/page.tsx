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
  }
}

const findTaskByID = async (id: string) => {
  try {
    const response = await fetch(`${API_ROUTES.TASKS}/${id}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const EditTask = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const task = await findTaskByID(id);
    return <TaskForm task={task} />;
  } catch (error) {
    console.error(error);
    return <div>Error loading task</div>;
  }
};

export default EditTask;
