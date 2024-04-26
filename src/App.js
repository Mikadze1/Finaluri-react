import React, { useEffect } from "react";
import { RoutesComponent } from "./routes";
import { useDispatch } from "react-redux";
import { fetchHomePageProducts } from "./redux/slices/productSlice";

const App = () => {
  const dispach = useDispatch();
  useEffect(() => {
    dispach(fetchHomePageProducts())
  }, []);

  return (
    <div>
      <RoutesComponent />
    </div>
  )
};


export default App