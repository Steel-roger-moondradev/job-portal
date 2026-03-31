"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AppContextType, AppProviderProps, User } from "../type";
import Cookies from 'js-cookie';
import axios from "axios";

const utils_service = "http://localhost:5001";
export const auth_service = "http://localhost:5000";
export const user_service = "http://localhost:5002";
export { utils_service };

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<AppProviderProps> =  ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnloading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    
    async function fetchUser(){
        const token=Cookies.get("token");
        if (!token) {
            setIsAuth(false);
            setUser(null);
            setLoading(false);
            return;
}
        try{
            const {data}=await axios.get(`${user_service}/api/user/me`,
                {
                     headers: {
                        Authorization: `Bearer ${token}`
                            }
                }
            )
            setUser(data as User);
            setIsAuth(true);
        }
        catch(error :any){
            console.log(error);
            setIsAuth(false);
            setUser(null);
        }
        finally{
            setLoading(false);
        }
    }
    
    
    useEffect(()=>
        {fetchUser()},[]);

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
