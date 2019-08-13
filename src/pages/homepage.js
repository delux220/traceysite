import React from "react"
import { Link, graphql } from "gatsby"

import {RichText} from 'prismic-reactjs';
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

  
  
export const query = graphql`
query HomepageQuery{
  prismic {
    allHomepages {
      edges {
        node {
          title
          hero_image
          hero_imageSharp {
            childImageSharp {
              fluid(maxWidth: 320, quality: 100) {
                ...GatsbyImageSharpFluid
                presentationWidth
              }
            }
          }

          background_color
        }
      }
    }
    allPodcasts {
      edges {
        node {
          title
          description
          cover_art
          background_image
          background_imageSharp {
            childImageSharp {
              fluid {
                base64
                tracedSVG
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
                originalImg
                originalName
                presentationWidth
                presentationHeight
              }
            }
          },
          host_group {
            hosts {
              ... on PRISMIC_Host {
                name
                photo
                photoSharp {
                  childImageSharp {
                    fixed {
                      src
                      srcSet
                      srcSetWebp
                      width
                      height
                      originalName
                    }
                  }
                }
              }
            }
            }
        }
      }
  }
}
}
`
const HomePage = (props) => {
  
  const page = props.data.prismic.allHomepages.edges[0];
  const podcasts = props.data.prismic.allPodcasts.edges;
 console.log(page);
  return <Layout>
    <SEO title="Home" />
    <section className="intro-section" id="home" style={{backgroundColor: page.node.background_color}}>
    
    <div className="intro-inner">
      <div className="intro-content">
        <div className="container">
          <Img fluid={page.node.hero_imageSharp.childImageSharp.fluid} style={{maxWidth:'200px', display:'block', margin:'auto'}}/>
          {RichText.render(page.node.title)}
        </div>
      </div>
    </div>
  </section>
  <section className="spad ">
    <div className="row" style={{maxWidth:'1024px', margin:'auto'}}>
      {podcasts.map(function(podcast) {
        return <div className="col-md-4">
          <div className="single-blog-item wow fadeInUp" style={{visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp'}}>
            <div className="blog-item-thumb">
              <img src={podcast.node.cover_art.wide.url} alt="" />
              <a href="single-blog.html" className="readm-btn" style={{lineHeight:'50px'}}>
                <FontAwesomeIcon icon={faPlay} />
              </a>
            </div>
            <div className="blog-item-content">
              {RichText.render(podcast.node.title)}
              <h4>Larry Stark - 7 September 2016 </h4>
              
              {RichText.render(podcast.node.description)}
            </div>
          </div>
        </div>
      })}
    </div>
  </section>
  </Layout>
}

export default HomePage
