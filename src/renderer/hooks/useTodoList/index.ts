import useAppSelector from "~/hooks/useAppSelector"

export default function useTodoList() {
  const todos = useAppSelector(state => state.todos)
  const { ordered, todosByID, groupsByID } = todos

  return (ordered || []).map(ID => todosByID[ID] || groupsByID[ID])
}
