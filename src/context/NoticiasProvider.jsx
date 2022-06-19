import { useEffect, useState, createContext } from 'react'
import axios from 'axios'

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) =>{
    const [categoria, setCategoria] = useState('general')
    const [noticias, setNoticias] = useState([])
    const [pages, setPages] = useState(1)
    const [totalNoticias, setTotalNoticias] = useState(0)

    const handleChangeCategoria = e =>{
        setCategoria(e.target.value)
    }

    useEffect(() => {
        const consultarApi = async () =>{
            const url = `https://newsapi.org/v2/top-headlines?country=ar&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`
            const {data} = await axios(url)

            setNoticias(data.articles)
            setTotalNoticias(data.totalResults)
            setPages(1)
        }
        consultarApi()
    }, [categoria]);

    useEffect(() => {
        const consultarApi = async () =>{
            const url = `https://newsapi.org/v2/top-headlines?country=ar&page=${pages}&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`
            const {data} = await axios(url)

            setNoticias(data.articles)
            setTotalNoticias(data.totalResults)
        }
        consultarApi()
    }, [pages]);


    const handleChangePagina = (e, valor) =>{
        setPages(valor)
    }
    return(
        <NoticiasContext.Provider
        value={{
            categoria,
            handleChangeCategoria,
            noticias,
            totalNoticias,
            handleChangePagina,
            pages
        }}
        >
            {children}
        </NoticiasContext.Provider>
    )
}

export {
    NoticiasProvider
}

export default NoticiasContext