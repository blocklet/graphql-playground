import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GraphQLPlayground from '@arcblock/graphql-playground';
import EndpointSwitcher from '../components/endpoint-switcher';
import { getPlaygroundSettings, replaceSearchParams } from '../lib/utils';
import { ReactComponent as GraphqlLogo } from '../assets/graphql-logo.svg';

const Home = () => {
  const history = useHistory();
  const [settings, setSettings] = useState(null);
  const handleChangeEndpoint = (value) => {
    // 更换 endpoint 时注意将 query 参数清除
    history.replace({ search: replaceSearchParams(history.location.search, { endpoint: value, query: null }) });
  };

  React.useEffect(() => {
    setSettings((state) => ({ ...state, ...getPlaygroundSettings() }));
  }, [history.location.search]);

  const hideHeader = new URLSearchParams(history.location.search).get('hideHeader');
  const basename = window?.blocklet?.prefix || '/';

  if (!settings) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" height={1}>
      {!hideHeader && (
        <Box
          component="header"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flex="0 0 64px"
          px={3}
          bgcolor="grey.200"
          color="text.primary"
          fontWeight={500}>
          <Box
            component="a"
            href={basename}
            color="inherit"
            display="flex"
            alignItems="center"
            style={{ textDecoration: 'none' }}>
            <GraphqlLogo style={{ width: 36, marginRight: 8 }} />
            <Typography variant="h6">GraphQL Playgroud</Typography>
          </Box>
          <EndpointSwitcher endpoint={settings.endpoint} onChange={handleChangeEndpoint} />
        </Box>
      )}
      <Box component="main" flex="1" overflow="hidden">
        <GraphQLPlayground
          key={settings.endpoint}
          style={{ height: '100%', marginLeft: 10 }}
          endpoint={settings.endpoint}
          title={settings.title}
          persistentQuery={settings.persistentQuery}
          enableHistory={settings.enableHistory}
          enableQueryComposer={settings.enableQueryComposer}
          enableCodeExporter={settings.enableCodeExporter}
          defaultQuery={settings.defaultQuery}
        />
      </Box>
    </Box>
  );
};

export default Home;
