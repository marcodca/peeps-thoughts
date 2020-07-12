import React from "react"
import { navigate } from "gatsby"
import { AuthProvider } from "react-use-auth"

export const wrapRootElement = ({ element }) => (
  <AuthProvider
    navigate={navigate}
    auth0_domain="marcodca.eu.auth0.com"
    auth0_client_id="f09WEs1XFmJSL5JxpirFXu4gbYvK1317"
  >
    {element}
  </AuthProvider>
)
