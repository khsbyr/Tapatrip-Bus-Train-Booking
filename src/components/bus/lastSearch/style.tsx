import styled from 'styled-components';

const ContentWrapper = styled.div`
  #style-1::-webkit-scrollbar {
    width: 8px;
  }

  #style-1::-webkit-scrollbar-track {
    background-color: transparent;
  }

  #style-1::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 7px solid transparent;
    background-clip: content-box;
  }

  #style-1::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
`;

export default ContentWrapper;
