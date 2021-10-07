import { CSSProperties, ReactNode } from "react"
import { AnyObject } from "~/global"

export type Shape = "rounded" | "circle"
export type Size = "sm" | "lg"
export type CSC<T = AnyObject> = T &
  Partial<{
    className: string
    style: CSSProperties
    children: ReactNode
  }>
