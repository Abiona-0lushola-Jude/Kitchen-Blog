import { createContext, useState } from "react"

export const searchContext = createContext()

export default function Search({children}) {

    const [search, setSearch] = useState("")

  return (
    <searchContext.Provider value={{search, setSearch}}>
        {children}
    </searchContext.Provider>
  )
}
