import { useState, useEffect } from 'react';
import { CompanyProvider } from './CompanyContext';

// eslint-disable-next-line react/prop-types
const CompanyContextWrapper = ({ children }) => {
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const storedCompany = JSON.parse(localStorage.getItem("company"));

        if (storedCompany) {
            setCompany(storedCompany);
        }
    }, []);

    return (
        <CompanyProvider
            value={{
                company, setCompany,
            }}
        >
            {children}
        </CompanyProvider>
    );
};

export default CompanyContextWrapper
