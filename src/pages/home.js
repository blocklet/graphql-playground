import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import GraphQLPlayground from '@arcblock/graphql-playground';
import EndpointChanger from '../components/endpoint-changer';
import { getPlaygroundSettings, replaceSearchParams } from '../lib/utils';

const Home = () => {
  const history = useHistory();
  const [settings, setSettings] = useState(null);
  const handleChangeEndpoint = (value) => {
    history.replace({ search: replaceSearchParams(history.location.search, { endpoint: value }) });
  };

  React.useEffect(() => {
    setSettings((state) => ({ ...state, ...getPlaygroundSettings() }));
  }, [history.location.search]);

  const hideHeader = new URLSearchParams(history.location.search).get('hideHeader');

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
          px={2}
          bgcolor="grey.200"
          color="text.primary"
          fontWeight={500}>
          <Box>GraphQL Playgroud</Box>
          <EndpointChanger endpoint={settings.endpoint} onChange={handleChangeEndpoint} />
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
