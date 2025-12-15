import React from 'react';
import PageContainer from '.';

export default {
  title: 'Components/PageContainer',
  component: PageContainer,
};

export const Default = () => (
  <PageContainer>
    <div style={{ padding: 16 }}>This is sample content inside PageContainer.</div>
  </PageContainer>
);
