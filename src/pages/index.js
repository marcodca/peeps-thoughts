import React, { useEffect, useState } from "react"
import axios from 'axios'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useAuth } from "react-use-auth"

const IndexPage = () => {

  const [thoughts, setThoughts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, login, logout } = useAuth()

  useEffect(() => {

    async function fetchAllThoughts() {
      setIsLoading(true)
      try {
        const resp = await axios.post('/api/get-all-thoughts')

        setThoughts(resp.data.thoughts)
        setIsLoading(false)
      }
      catch (e) {
        console.error(e)
        setIsLoading(false)
      }
    }

    fetchAllThoughts()

  }, [])

  console.log(useAuth())

  return (
    <Layout>
      <SEO title="Home" />
      <h1>What is people thinking?</h1>
      {
        isLoading
          ? <p>Loading....</p>
          : thoughts.map(({ title, content, id }) => (
            <div key={id}>
              <h2>{title}</h2>
              <p>{content}</p>
            </div>
          ))
      }
      {<button onClick={isAuthenticated() ? logout : login}>Log{ isAuthenticated() ? "out" : "in"}</button>}
    </Layout>
  )
}

export default IndexPage
