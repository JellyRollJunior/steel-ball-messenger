import { useContext } from 'react';
import { PageContentContext } from '../providers/MainContentContext/PageContentContext.jsx';

const usePageContentContext = ( initial ) => {
    const context = useContext(PageContentContext);
    if (context === undefined) {
        throw new Error(
            'PageContentContext was used outside of PageContentContextProvider'
        );
    }
    context.setPageContent(initial);
    return context;
};

export { usePageContentContext };
