import React from 'react';

export default {
  title: 'Components/PublicRoute',
};

export const LoggedOut = () => (
  <div style={{ padding: 16 }}>
    <h3>Public Content</h3>
    <p>This content is visible when the user is not authenticated.</p>
  </div>
);

export const RedirectedWhenLoggedIn = () => (
  <div style={{ padding: 16 }}>
    <h3>Redirected</h3>
    <p>If the user is authenticated they would be redirected away from this page.</p>
  </div>
);
