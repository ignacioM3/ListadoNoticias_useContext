import { Grid, Typography, Pagination, Stack } from "@mui/material"
import useNoticias from "../hooks/useNoticias"
import Noticia from "./Noticia"



const ListadoNoticias = () => {
    const { noticias, totalNoticias, handleChangePagina, pages } = useNoticias()

    const totalPaginas = Math.ceil(totalNoticias/20)

    return (
        <>
            <Typography
                textAlign={"center"}
                marginY={5}
                variant="h3"
                component="h2"
            >
                Últimas noticias
            </Typography>
            <Grid container spacing={2}>
                {noticias.map(noticia => (
                    <Noticia
                        key={noticia.url}
                        noticia={noticia} />
                ))}
            </Grid>
            <Stack 
                sx={{marginY: 5}}
                spacing={2}
                direction={"row"}
                justifyContent="center"
                alignItems={"center"}
                >
                <Pagination 
                    count={totalPaginas} 
                    color="primary" 
                    page={pages}
                    onChange={handleChangePagina}
                    />
              
            </Stack>
        </>
    )
}

export default ListadoNoticias