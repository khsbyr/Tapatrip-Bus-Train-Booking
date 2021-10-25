import { ApolloClient, InMemoryCache } from '@apollo/client';

console.log(process.env.NEXT_GRAPHQL_URL);

export const client = new ApolloClient({
  uri: process.env.NEXT_GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6Imd1ZXN0X3VzZXIiLCJleHAiOjE2MzUyMTMwNTUsImVtYWlsIjpudWxsLCJkZXZpY2VfaXAiOiIxMDMuMTQuMzYuODIiLCJkZXZpY2VfbmFtZSI6ImlaajZjOHF1aWplMTRqWiIsImRldmljZV9vcyI6Ik90aGVyIn0.siWR1vXmLhXRGahdeyKbJIW-sMDLe8zZaq6xQUMimZA',
  },
});
