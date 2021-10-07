import useAppSelector from "~/hooks/useAppSelector"

export default function useCurrentTodo() {
  const todos = useAppSelector(state => state.todos)
  return todos.todosByID[todos.currentTodoID] ?? {}
}
