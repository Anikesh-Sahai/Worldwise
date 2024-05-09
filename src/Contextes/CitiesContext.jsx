import { createContext, useContext, useEffect, useState } from "react";


const BASE_URL = 'http://localhost:8001'

const CitiesContext = createContext()

function CitiesProviders({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({})

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json()
                setCities(data)

            } catch (error) {

                alert("ops something went wrong")

            } finally {
                setIsLoading(false)
            }

        }
        fetchCities()
    }, [])

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json()
            setCurrentCity(data)

        } catch (error) {

            alert("ops something went wrong")

        } finally {
            setIsLoading(false)
        }

    }

    return <CitiesContext.Provider value={{
        cities, isLoading, currentCity, getCity
    }}>
        {children}
    </CitiesContext.Provider>
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error("CitiesContext is used outside of the CitiesProvider");
    return context;
}

export { CitiesProviders, useCities }