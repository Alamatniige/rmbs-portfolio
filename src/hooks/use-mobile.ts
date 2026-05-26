import * as React from "react"

const MOBILE_BREAKPOINT = 768

function getIsMobile() {
  return window.innerWidth < MOBILE_BREAKPOINT
}

export function useViewport() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(getIsMobile())
    }
    mql.addEventListener("change", onChange)
    setIsMobile(getIsMobile())
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return {
    isMobile: isMobile === true,
    isReady: isMobile !== null,
  }
}

export function useIsMobile() {
  return useViewport().isMobile
}
