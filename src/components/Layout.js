import { Grid } from "@mui/material"
import React from "react"
import { Outlet } from "react-router-dom"
import { Header } from "./header/Header"

export const Layout = () => {
    return(
        <Grid container sx={{ minHeight: "100vh" }}>
            <Grid item>
                <Header />
            </Grid>
            <Grid
            item
            sx={{
                paddingTop: 20,
                minHeight: "100%",
                width: "100%",
                pb: 10,
                backgroundColor: "#f5f5f5",
            }}
            >
                <Outlet />
            </Grid>

        </Grid>
    )
}
