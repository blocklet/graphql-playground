import React from 'react';
import Box from '@material-ui/core/Box';
import withTheme from '@arcblock/ux/lib/withTheme';
import GraphQLPlayground from '@arcblock/graphql-playground';

const ThemedPlayground = withTheme(GraphQLPlayground);

const About = () => {
  return (
    <Box height={1}>
      <ThemedPlayground
        style={{ height: '100%', marginLeft: 10 }}
        // defaultQuery={defaultQuery}
        endpoint="https://beta.abtnetwork.io/api/"
        title="Query"
        persistentQuery={false}
        enableHistory
        enableQueryComposer
        enableCodeExporter
      />
    </Box>
  );
};

export default About;
