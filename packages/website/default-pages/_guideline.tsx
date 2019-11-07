import React from "react";
import { graphql } from "gatsby";

type Guideline = {
  data: {
    contentfulGuideline: {
      title: string,
      content: object
    }
  }
}

export default ({ data }:Guideline) => {
  const { title, content } = data.contentfulGuideline;
  return (
    <h1>{title}</h1>
  )
};

export const query = graphql`
  query($slug: String!) {
    contentfulGuideline(slug: {eq: $slug }) {
      title
      content {
        json
      }
    }
  }
`;