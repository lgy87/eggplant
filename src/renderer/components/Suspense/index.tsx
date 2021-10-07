import React, {
  ComponentProps,
  FC,
  ReactNode,
  Suspense as ReactSuspense,
} from "react"
import Loading from "~/components/Loading"
import styles from "./styles.module.css"

type ReactSuspenseProps = ComponentProps<typeof ReactSuspense>
type Props = Omit<ReactSuspenseProps, "fallback"> & {
  children: ReactNode
  fallback?: Pick<ReactSuspenseProps, "fallback">
}

const loading = <Loading className={styles.loading} />

const Suspense: FC<Props> = ({ children }) => {
  return <ReactSuspense fallback={loading}>{children}</ReactSuspense>
}

export default Suspense
