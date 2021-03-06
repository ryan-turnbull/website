import React from "react"
import FadeIn from "react-fade-in/lib/FadeIn"
import { OutboundLink } from "gatsby-plugin-amplitude-analytics"

import SEO from "../components/seo"
import { Layout } from "../components/layout"

import GithubLogo from "../assets/svg/github.svg"
import LinkedinLogo from "../assets/svg/linkdin.svg"
import EmailLogo from "../assets/svg/gmail.svg"

export const Contact = () => {
  return (
    <Layout
      titleContent={
        <FadeIn delay={100}>
          <h1>Contact</h1>
          <div>
            <p className="max-w-xs mx-auto mt-8 mb-12">
              Feel free to shoot me an email for any questions about anything
              you see here, or just to say hi
            </p>
            <div className="flex justify-between items-center max-w-xs mx-auto px-8">
              <OutboundLink
                className="contact-logo"
                target="_blank"
                href="https://github.com/ryan-turnbull"
                rel="noopener noreferrer"
              >
                <GithubLogo />
              </OutboundLink>
              <OutboundLink
                className="contact-logo"
                href="https://www.linkedin.com/in/ryan-turnbull-profile/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinLogo />
              </OutboundLink>
              <OutboundLink
                className="contact-logo"
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:ryanturnbullemail@gmail.com"
              >
                <EmailLogo />
              </OutboundLink>
            </div>
            {/* <p className="text-center mt-12">043 206 2027</p> */}
          </div>
        </FadeIn>
      }
    >
      <SEO title="Contact" />
    </Layout>
  )
}

export default Contact
