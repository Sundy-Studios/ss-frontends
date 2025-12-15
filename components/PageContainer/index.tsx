import React, { ReactNode } from "react";
import { Container } from "@mui/material";

interface Props {
  children: ReactNode;
}

const PageContainer: React.FC<Props> = ({ children }) => (
  <Container maxWidth="md" sx={{ mt: 4 }}>
    {children}
  </Container>
);

export default PageContainer;
