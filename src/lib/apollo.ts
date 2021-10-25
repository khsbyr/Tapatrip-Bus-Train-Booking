import { ApolloClient, InMemoryCache } from '@apollo/client';

// console.log(process.env.NEXT_GRAPHQL_URL);

export const client = new ApolloClient({
  uri: 'http://47.243.62.69:8001/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6Imd1ZXN0X3VzZXIiLCJleHAiOjE2MzUyMjg0OTMsImVtYWlsIjpudWxsLCJkZXZpY2VfaXAiOiIxMDMuMTQuMzYuODIiLCJkZXZpY2VfbmFtZSI6ImlaajZjOHF1aWplMTRqWiIsImRldmljZV9vcyI6Ik90aGVyIn0.V7LRrJjNUVFINHDN9IRbWBfSKC2VIRbeJnruVtzs3rA',
  },
});
