import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
// import '../css/blog-post.css'; // make it pretty!

export default function Template({
  data, // this prop will be injected by the GraphQL query
}) {
  const { markdownRemark: post } = data
  return (
    <div className="blog-post-container">
      <Helmet title={post.frontmatter.title} />
      <div className="blog-post">
        <h2>{post.frontmatter.date}</h2>
        <h1>{post.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
      <Link to="/">Back to the index</Link>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
