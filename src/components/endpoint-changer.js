import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
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
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <Button variant="contained" color="primary" disabled={endpoint === inputText} onClick={changeEndpoint}>
        {' '}
        -&gt;{' '}
      </Button>
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
  }
`;

export default EndpointChanger;
