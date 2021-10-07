import localforage from "localforage"
import { name } from "~/configs"
import driver from "./config"

export default localforage.createInstance({
  name,
  driver,
})
