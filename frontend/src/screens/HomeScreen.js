import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function HomeScreen() {
  //define a React hook:
  const [products, setProducts] = useState([]);
  //another hook to show loading process of fetching data from backend
  const [error, setError] = useState(false);
  //hook for error
  const [loading, setLoading] = useState(false);
  //useEffect function
  useEffect(() => {
    //sends ajax request to backend to fetch products
    const fetchData = async () => {
      try {
        //loading the data
        setLoading(true);
        const { data } = await axios.get("/api/products");
        setLoading(false);
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
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
