import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { isValidHttpUrl } from '../lib/utils';

const EndpointChanger = ({ endpoint, onChange, ...rest }) => {
  const [inputText, setInputText] = useState(endpoint);
  const changeEndpoint = () => {
    if (!isValidHttpUrl(inputText)) {
      alert('Invalid HTTP URL');
      return;
    }
    if (endpoint !== inputText) {
      onChange(inputText);
    }
  };
  return (
    <Root {...rest}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter an endpoint url"
      />
      <IconButton color="primary" disabled={!inputText.trim() || endpoint === inputText} onClick={changeEndpoint}>
        <ArrowForwardIcon />
      </IconButton>
    </Root>
  );
};

EndpointChanger.propTypes = {
  endpoint: PropTypes.string,
  onChange: PropTypes.func,
};

EndpointChanger.defaultProps = {
  endpoint: '',
  onChange: () => {},
};

const Root = styled.div`
  input {
    width: 500px;
    padding: 12px 16px;
    border: none;
  }
  .MuiButtonBase-root {
    margin-left: 8px;
  }
`;

export default EndpointChanger;
