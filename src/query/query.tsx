import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query($name: String!, $first: Int!, $after: String) {
    search(query: $name, first: $first, after: $after, type: REPOSITORY) {
      pageInfo {
        endCursor
        hasNextPage
      }
        
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            pushedAt
            owner {
              login
              avatarUrl
            }
            primaryLanguage {
              name
            }
            description 
            url
            stargazers { totalCount }
           
          }
          
        } 
      } 
    } 
  }
  `;


