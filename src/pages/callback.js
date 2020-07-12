import React, { useEffect } from "react"
import { useAuth } from "react-use-auth"

const Callback = () => {
  const { handleAuthentication } = useAuth()

  useEffect(() => {
    handleAuthentication({ postLoginRoute: "/" })
  }, [handleAuthentication])

  return <p>Loading...</p>
}

export default Callback