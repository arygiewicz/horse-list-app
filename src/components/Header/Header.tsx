import React from 'react';
import styled from 'styled-components';

const StyledText = styled.p`
  margin: 0;
  font-size: 32px;
  font-weight: bold;
`

const Header: React.FC<{}> = () => (
  <StyledText>Available horses:</StyledText>
);

export default Header;