import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BottomBarContextType {
    isVisible: boolean;
    showBottomBar: () => void;
    hideBottomBar: () => void;
}

interface BottomBarProviderProps {
    children: ReactNode; // ReactNode 타입을 사용하여 children을 정의합니다.
}

const BottomBarContext = createContext<BottomBarContextType | undefined>(undefined);

export const useBottomBar = () => {
    const context = useContext(BottomBarContext);
    if (context === undefined) {
        throw new Error('useBottomBar must be used within a BottomBarProvider');
    }
    return context;
};

export const BottomBarProvider: React.FC<BottomBarProviderProps> = ({ children }) => { // 여기서 타입을 명시합니다.
    const [isVisible, setIsVisible] = useState(true);

    const showBottomBar = () => setIsVisible(true);
    const hideBottomBar = () => setIsVisible(false);

    return (
        <BottomBarContext.Provider value={{ isVisible, showBottomBar, hideBottomBar }}>
            {children}
        </BottomBarContext.Provider>
    );
};
