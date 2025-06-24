import { useState } from 'react';
import { PageContentContext } from './PageContentContext.jsx';

const PageContentProvider = ({children}) => {
  const [pageContent, setPageContent] = useState();

  return (
    <PageContentContext.Provider value={{ pageContent, setPageContent }}>
      {children}
    </PageContentContext.Provider>
  );
};

export { PageContentProvider };
