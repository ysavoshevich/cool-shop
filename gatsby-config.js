require('dotenv').config()

const path = require('path')
const {
  GATSBY_ACTIVE_ENV,
  // GATSBY_CMS_URL,
  GATSBY_SITE_URL,
  GATSBY_TITLE,
  GATSBY_DESCRIPTION,
  GOOGLE_ANALYTICS_ID,
  GATSBY_SHOPIFY_SHOP_NAME,
  GATSBY_SHOPIFY_ACCESS_TOKEN,
} = process.env
const isProd = GATSBY_ACTIVE_ENV === 'production'

module.exports = {
  siteMetadata: {
    title: GATSBY_TITLE,
    siteUrl: GATSBY_SITE_URL,
    description: GATSBY_DESCRIPTION,
    author: '@unikorns',
  },
  plugins: [
    '@chakra-ui/gatsby-plugin',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: GOOGLE_ANALYTICS_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '~': path.resolve(__dirname, 'src'),
        },
        extensions: [],
      },
    },
    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName: GATSBY_SHOPIFY_SHOP_NAME,
        accessToken: GATSBY_SHOPIFY_ACCESS_TOKEN,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'unikorns-gatsby-starter',
        short_name: 'unikorns',
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/assets/icons/global/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: GATSBY_SITE_URL,
        sitemap: `${GATSBY_SITE_URL}/sitemap.xml`,
        policy: isProd
          ? [{ userAgent: '*', allow: '/' }]
          : [{ userAgent: '*', disallow: '/' }],
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
  ],
}
