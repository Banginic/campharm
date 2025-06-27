'use client';
import { createContext } from "react";
import { AppContextType } from "../models/types";


 const AppContext = createContext< AppContextType | null>(null)

 export default AppContext