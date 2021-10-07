import useElectron from "../useElectron"

export default function useDB() {
  return useElectron().db
}
