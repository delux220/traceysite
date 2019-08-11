/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./layout.css"
import "./css/animate.min.css"
import "./css/style.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div style={{height:'100vh',overflow:'auto'}}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="left-bar">
    <div className="logo">
      <h2>T</h2>
    </div>
    <div className="social">
      <div>
        <a href=""><i className="fa fa-facebook"></i></a>
        <a href=""><i className="fa fa-twitter"></i></a>
        <a href=""><i className="fa fa-instagram"></i></a>
      </div>
    </div>
    <div className="nav-switch">
      <span className="bar-one"></span>
      <span className="bar-two"></span>
      <span className="bar-three"></span>
    </div>
  </div>
  
      {children}
    
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
