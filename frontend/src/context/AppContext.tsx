"use client";
import { createContext, useContext, useState } from "react";
import { AppContextType, AppProviderProps, User } from "../type";

const utils_service = "http://localhost:5001";
export const auth_service = "http://localhost:5001";
export const user_service = "http://localhost:5001";
export const jobs_service = "http://localhost:5001";
export { utils_service };

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnloading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    return (
        <AppContext.Provider
            value={{
                user,
                loading,
                btnLoading,
                isAuth,
                setUser,
                setLoading,
                setIsAuth,
                setBtnloading,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
export const useappdata=():AppContextType=>{
    const context=useContext(AppContext);
    if(!context){
        throw new Error("useappdata must be wrapped in AppContext");
    }
    return context;
}
