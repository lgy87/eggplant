import { TaskID } from "~/types"
import useAppSelector from "../useAppSelector"

export default function useTask(ID: TaskID) {
  const tasks = useAppSelector(state => state.todos.tasksByID)
  return tasks[ID] ?? {}
}
