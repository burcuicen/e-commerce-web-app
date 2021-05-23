import React, { useEffect } from "react";

import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const dispatch = useDispatch();
  //we can use react redux easily other than using ajax requests
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  //dispatch the action
  useEffect(() => {
    //using react redux to send request is easier than using ajax
    dispatch(listProducts());
  }, []);
  //check if any error exists, if not return products
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}
