import React, { FC, useMemo, useState } from 'react';

import { Props } from '../../../../shared/lib/props';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;


const ThemeProvider: FC<Props> = ({children}) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    const deafultProps = useMemo(() => ({
        theme: theme,
        setTheme: setTheme
    }), [theme])

    return (
        <ThemeContext.Provider value={deafultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;