import { useEffectOnce } from "react-use"
import useElectron from "~/hooks/useElectron"

export default function useWindowSize(
  width: number,
  height: number,
  animate = true,
) {
  const electron = useElectron()

  useEffectOnce(() => {
    electron.window.setSize(width, height, animate)
  })
}
