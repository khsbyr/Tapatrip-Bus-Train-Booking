import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.NEXT_GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6Imd1ZXN0X3VzZXIiLCJleHAiOjE2MzQ5NTQ4MzcsImVtYWlsIjpudWxsLCJkZXZpY2VfaXAiOiIxMDMuMTQuMzYuODIiLCJkZXZpY2VfbmFtZSI6ImlaajZjOHF1aWplMTRqWiIsImRldmljZV9vcyI6Ik90aGVyIn0.HCDyTrf9KwG6oQn4Gzxr1KBjx2pdyhKR_s44bJec4F0',
  },
});
