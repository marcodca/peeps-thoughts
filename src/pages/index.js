import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {

  const [thoughts, setThoughts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
    </Layout>
  )
}

export default IndexPage
