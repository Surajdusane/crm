"use client"

import { usePathname } from "next/navigation"

const Path = () => {
    const pathname = usePathname()
  return (
    <div>{pathname}</div>
  )
}

export default Path