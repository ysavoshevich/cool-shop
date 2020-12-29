import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Container } from 'react-bootstrap'

import styles from './hero-section.module.scss'
import Img from 'gatsby-image'

const HeroSection = () => {
  const data = useStaticQuery(graphql`
    query {
      unicornPic: file(relativePath: { eq: "images/global/unicorn-pic.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 500, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Container>
      <div className={styles.heroBlock}>
        <Img
          fluid={data.unicornPic.childImageSharp.fluid}
          className={styles.pic}
        />
        <p className={styles.heroTitle}>Let the magic work!</p>
      </div>
    </Container>
  )
}
export default HeroSection
