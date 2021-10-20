import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function About() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h1" component="h1" gutterBottom>
          Next.js example
        </Typography>
      </Box>
    </Container>
  );
}
