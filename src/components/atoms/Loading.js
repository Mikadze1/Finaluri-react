import { Box, styled, CircularProgress } from "@mui/material"
// import { styled } from "@mui/system"
import React, { Children } from "react"

const StyledLoadingContainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
}));

export const Loading = ({ size = 100, color = "success"}) => {
    return (
        <StyledLoadingContainer>
           <CircularProgress color={color} size={size} /> 
        </StyledLoadingContainer>
    );
};



export const LoadingWrapper = ({ isLoading, children}) => {
    if (isLoading) return <Loading/>


    return children;
};


<LoadingWrapper isLoading={false}>
    <h1>productebi</h1>
</LoadingWrapper>