import { createContext, useContext } from 'react'

export const CompanyContext = createContext({ company: {}, setCompany: () => { } });

export const CompanyProvider = CompanyContext.Provider

export const useCompany = () => {
    return useContext(CompanyContext)
}
