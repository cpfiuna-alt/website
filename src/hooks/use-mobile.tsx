
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => 
    // Set initial state based on window size if available, otherwise default to false
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Use matchMedia for better performance and avoid resize event spam
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches)
    }
    
    // Modern API
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
      // Initial check
      onChange(mql)
    } 
    // Older browsers
    else {
      window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      })
      // Initial check
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onChange)
      } else {
        window.removeEventListener('resize', () => {
          setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        })
      }
    }
  }, [])

  return isMobile
}
