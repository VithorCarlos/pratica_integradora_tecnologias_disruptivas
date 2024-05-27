import { create } from "zustand";
import { createData } from "../utils/create-data";
import { createJSONStorage, persist } from "zustand/middleware";

const initialRows = [
  createData(
    1,
    "Tarefa 1",
    "Descrição da Tarefa 1",
    "2022-01-01",
    "2022-01-02",
    "Concluída",
    "Recurso 1"
  ),
  createData(
    2,
    "Tarefa 2",
    "Descrição da Tarefa 2",
    "2022-01-03",
    "2022-01-04",
    "Em Andamento",
    "Recurso 2"
  ),
  createData(
    3,
    "Tarefa 3",
    "Descrição da Tarefa 3",
    "2022-01-04",
    "2022-01-05",
    "Em Andamento",
    "Recurso 3"
  ),
  createData(
    4,
    "Tarefa 4",
    "Descrição da Tarefa 4",
    "2022-01-05",
    "2022-01-06",
    "Em Andamento",
    "Recurso 4"
  ),
  createData(
    5,
    "Tarefa 5",
    "Descrição da Tarefa 5",
    "2022-01-06",
    "2022-01-07",
    "Em Andamento",
    "Recurso 5"
  ),
  createData(
    6,
    "Tarefa 6",
    "Descrição da Tarefa 6",
    "2022-01-07",
    "2022-01-08",
    "Aguardando",
    "Recurso 6"
  ),
];

export const useTasks = create(
  persist(
    (set) => ({
      tasks: initialRows,
      addTask: (newTask) =>
        set((state) => ({ tasks: [...state.tasks, newTask] })),
      editTask: (updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.idTarefa === updatedTask.idTarefa
              ? { ...task, ...updatedTask }
              : task
          ),
        })),
      removeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.idTarefa !== taskId),
        })),
      removeAllTasks: () => set({ tasks: [] }),
    }),
    {
      name: "tasks-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
