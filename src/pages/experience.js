import React, { useState, useMemo, useEffect } from "react"
import { graphql } from "gatsby"
import FadeIn from "react-fade-in"
import { Flipper, Flipped } from "react-flip-toolkit"
import { renderRichText } from "gatsby-source-contentful/rich-text"

import SEO from "../components/seo"
import { Layout } from "../components/layout"
import { format } from "date-fns"

const updateSelectedUrlState = slug => {
  const newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    (slug ? `?selected=${slug}` : "")
  window.history.pushState({ path: newurl }, "", newurl)
}

const getSelectedItem = items => {
  if (typeof window === "undefined") {
    return
  }
  const urlParams = new URLSearchParams(window.location.search)
  const selected = urlParams.get("selected")

  const found = items.find(item => item.slug === selected)
  return found ? found.slug : null
}

const Experience = ({ data, location }) => {
  const experiences = useMemo(() => {
    return data.allContentfulExperience.edges.map(item => {
      return item.node
    })
  }, [data])

  const [selectedItem, setSelectedItem] = useState(getSelectedItem(experiences))

  const handleExpSelect = ({ slug }) => {
    setSelectedItem(slug)
    updateSelectedUrlState(slug)
  }

  const handleReset = () => {
    setSelectedItem(null)
    updateSelectedUrlState(null)
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const func = window.addEventListener("popstate", function (event) {
      const path = window?.history?.state?.path
      if (path.indexOf("selected") === -1) {
        handleReset()
      }
    })

    return () => window.removeEventListener("popstate", func)
  }, [])

  const titleContent = useMemo(() => {
    const selectedExp = experiences.find(exp => exp.slug === selectedItem)
    if (selectedExp) {
      return (
        <div className="flex flex-col items-center w-max max-w-full mx-auto">
          <div
            className="cursor-pointer  absolute left-8 -top-28 sm:left-0 sm:-top-16"
            onClick={handleReset}
          >
            <FadeIn delay={800}>
              <p className="text-2xl sm:text-sm">&#8592;</p>
            </FadeIn>
          </div>
          <Flipped flipId={selectedExp.slug}>
            <div>
              <img
                className="h-24 w-24 rounded-lg mx-8 shadow-lg"
                src={selectedExp.image.file.url}
                alt={`${selectedExp.name} Logo`}
                onClick={handleReset}
              />
            </div>
          </Flipped>
          <FadeIn delay={300} duration={300}>
            <h1 className="mt-6 mb-4">{selectedExp.jobTitle}</h1>
            <FadeIn delay={50} className="text-center text-gray-500">
              <p>{selectedExp.name}</p>
              <p>
                {format(new Date(selectedExp.startDate), "MMMM yyyy")} -{" "}
                {selectedExp.endDate
                  ? format(new Date(selectedExp.endDate), "MMMM yyyy")
                  : "Present"}
              </p>
            </FadeIn>
          </FadeIn>
        </div>
      )
    }

    return (
      <div className="text-center">
        <FadeIn delay={200}>
          <h1 className="mb-7">Recent Experience</h1>
        </FadeIn>
        <div className="flex items-center justify-center">
          {experiences.map(exp => (
            <Flipped flipId={exp.slug} key={exp.slug}>
              <div
                className="cursor-pointer"
                onClick={() => handleExpSelect(exp)}
              >
                <img
                  className="h-16 w-16 rounded-lg mx-6 shadow-lg"
                  src={exp.image.file.url}
                  alt={`${exp.name} Logo`}
                />
              </div>
            </Flipped>
          ))}
        </div>
      </div>
    )
  }, [experiences, selectedItem])

  const expContent = useMemo(() => {
    return experiences.find(exp => exp.slug === selectedItem)
  }, [selectedItem, experiences])

  return (
    <Layout
      titleContent={<Flipper flipKey={selectedItem}>{titleContent}</Flipper>}
    >
      <SEO title="Experience" />
      {selectedItem && expContent && (
        <FadeIn delay={800}>
          <div className="max-w-xl mx-auto pb-24">
            <h2 className="my-4">Overview</h2>
            {renderRichText(expContent.overview)}
            <h2 className="my-4">Outcomes & Responsibilities</h2>
            {renderRichText(expContent.outcomesResponsibilities)}
            <h2 className="my-4">Technology</h2>
            {renderRichText(expContent.technology)}
          </div>
        </FadeIn>
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query MyQuery {
    allContentfulExperience(sort: { fields: [endDate], order: DESC }) {
      edges {
        node {
          id
          image {
            id
            file {
              url
            }
          }
          name
          slug
          startDate
          endDate
          jobTitle
          overview {
            raw
          }
          outcomesResponsibilities {
            raw
          }
          technology {
            raw
          }
        }
      }
    }
  }
`

export default Experience
