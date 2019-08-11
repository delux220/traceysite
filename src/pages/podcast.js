import React from "react"
import { Link } from "gatsby"
import {RichText} from 'prismic-reactjs';
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import BackgroundImage from 'gatsby-background-image'
import Img from "gatsby-image"

  
  
  
export const query = graphql`
query PodcastQuery($uid: String) {
  prismic {
    allPodcasts(uid: $uid) {
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



const Podcast = props => {
  //console.log(props);
  const doc = props.data.prismic.allPodcasts.edges.slice(0,1).pop();
  console.log(doc);
  if(!doc) return null;
  console.log(doc.node);
 
  return <Layout>
    <SEO title="Home" />
    <section className="intro-section" id="home">
    <BackgroundImage className="intro-bg" fluid={doc.node.background_imageSharp.childImageSharp.fluid}/>
    <div className="intro-inner">
      <div className="intro-content">
        <div className="container">
          <div><img src={doc.node.cover_art.url} style={{height:'140px', width:'140px'}}/></div>
          {RichText.render(doc.node.title)}
        </div>
      </div>
    </div>
  </section>
  <section className="hosts-section spad">
  <div className="row">
  <div className="col-md-12">
    <div className="section-title">
        <h2><span>Your</span> Hosts</h2>
      </div>
  </div>
  </div>
    <div className="row" style={{maxWidth:'1200px', margin:'auto'}}>
       {doc.node.host_group.map(function(host){
          console.log(host);
          return <div className="col-md-4">
            <div className="testimonel-item">
              <div className="testimonel-img" style={{width:'128px', height:'128px'}}>
                <Img fixed={host.hosts.photoSharp.childImageSharp.fixed} alt="" fadeIn={true} imgStyle={{width:'128px', height:'128px'}} style={{width:'128px', height:'128px'}}/>
              </div>
              {RichText.render(host.hosts.name)}
              <h3 style={{marginTop:'9px'}}>Host</h3>
              <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum is simply dummy text.</p>
            </div>
          </div>
      })}
    </div>
  </section>
  </Layout>
}

export default Podcast
