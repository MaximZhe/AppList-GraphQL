import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query($name: String!){ 
    search(query: $name, last: 10, type: REPOSITORY) { 
        pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }     
          
        
    edges { 
    node { 
    ... on Repository { 
        id
    name
    pushedAt
    owner {
        login
      }
      primaryLanguage {
        name
      }
    description 
    url
    
    stargazers {totalCount}  
    } 
    
    } 
    } 
    } 
    }
`;