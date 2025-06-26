import { useState } from 'react';
import { PageContentContext } from './PageContentContext.jsx';
import { pages } from '../../pages/Homepage/pages.js';

const PageContentProvider = ({children}) => {
  const [pageContent, setPageContent] = useState(pages.CHATS);

  return (
    <PageContentContext.Provider value={{ pageContent, setPageContent }}>
      {children}
    </PageContentContext.Provider>
  );
};

export { PageContentProvider };
