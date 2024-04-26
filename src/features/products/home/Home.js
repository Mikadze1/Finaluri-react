import React from "react"
import { useProduct } from "../../../hooks"
import { LoadingWrapper } from "../../../components/atoms"
import { GridContainer } from "../components"
import { ProductCard } from "../components/ProductCard"


export const Home = () => {
    const { loading, homePageProducts } = useProduct()
    return (
        <LoadingWrapper isLoading={loading}>
            <GridContainer>
                {homePageProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </GridContainer>
        </LoadingWrapper>
    )
}