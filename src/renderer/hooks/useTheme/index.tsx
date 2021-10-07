import useAppSelector from "~/hooks/useAppSelector"

export default function useTheme() {
  return useAppSelector(state => state.settings.theme)
}

export function usePrimary() {
  return useTheme().primary
}

export function useSecondary() {
  return useTheme().secondary
}
