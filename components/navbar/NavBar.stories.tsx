import React from 'react';
import { Box, Button } from '@mui/material';

export default {
  title: 'Components/NavBar',
};

// We avoid rendering the real NavBar because it depends on `useAuth` and Next internals.
// Instead provide a small visual mock that represents logged-in and logged-out states.

const MockNav = ({ user }: { user?: { name?: string } }) => (
  <Box sx={{ bgcolor: '#1976d2', color: 'white', p: 2, display: 'flex', alignItems: 'center' }}>
    <Box sx={{ flex: 1, fontWeight: 'bold' }}>MyApp</Box>
    {user ? (
      <>
        <Button color="inherit" sx={{ color: 'white' }}>Items</Button>
        <Button color="inherit" sx={{ color: 'white' }}>Health</Button>
        <Button color="inherit" sx={{ color: 'white' }}>Logout</Button>
      </>
    ) : (
      <>
        <Button color="inherit" sx={{ color: 'white' }}>Login</Button>
        <Button color="inherit" sx={{ color: 'white' }}>Sign Up</Button>
      </>
    )}
  </Box>
);

export const LoggedOut = () => <MockNav />;
export const LoggedIn = () => <MockNav user={{ name: 'Demo User' }} />;
