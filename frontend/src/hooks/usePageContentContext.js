import { useContext } from 'react';
import { PageContentContext } from '../providers/PageContentContext/PageContentContext.jsx';

const usePageContentContext = () => {
    const context = useContext(PageContentContext);
    if (context === undefined) {
        throw new Error(
            'PageContentContext was used outside of PageContentContextProvider'
        );
    }
    return context;
};

export { usePageContentContext };
