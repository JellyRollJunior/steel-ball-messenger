import { createContext } from 'react';

const PageContentContext = createContext({
  pageContent: [],
  setPageContent: () => {},
});

export { PageContentContext };
