import React from 'react';

export default {
  title: 'Components/ProtectedRoute',
};

export const RequiresLogin = () => (
  <div style={{ padding: 16 }}>
    <h3>Protected Content</h3>
    <p>If the user is not authenticated they would be redirected to the login page.</p>
  </div>
);

export const WhenLoggedIn = () => (
  <div style={{ padding: 16 }}>
    <h3>Protected Content (Authenticated)</h3>
    <p>When a user is authenticated the protected children are rendered.</p>
  </div>
);
