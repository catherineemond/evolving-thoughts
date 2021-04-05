import React from "react"
import { Link, graphql } from "gatsby"

import "../css/index.css" // eventually add some style :)

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <div className="blog-posts">
      <ul>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <li className="blog-post-preview" key={post.id}>
                <Link to={post.frontmatter.path}>
                  {post.frontmatter.date}: {post.frontmatter.title}
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`
