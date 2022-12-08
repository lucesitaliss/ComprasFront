import { applyMiddleware } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import { useNavigate } from 'react-router-dom'
import "./productCheckbox.css";
import { getApiUrl } from "../../../api";

export default function ProductsCheckbox() {
  const { categoryId } = useSelector((state) => state.categorySelect);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    categoryId && getProductsByCategory();
  }, [categoryId]);

  // const navegate = useNavigate()
  const getProductsByCategory = async () => {
    if (categoryId > 0) {
      const apiUrl = getApiUrl(`products/category/${categoryId}`);
      const response = await fetch(apiUrl);
      const result = await response.json();
      setProducts(result);
    }
  };

  const invertChecked = (checked) => {
    if (checked) {
      checked = false;
      return checked;
    }
    checked = true;
    return checked;
  };

  const handleChange = async (e) => {
    try {
      const apiUrl = getApiUrl(`product/checked/id/${e.target.id}`);
      console.log("e.targetonchange", e.target);
      const oldValueChecked = await fetch(apiUrl);
      const objectchecked = await oldValueChecked.json();
      const checked = objectchecked.checked;

      const dataBody = {
        valueChecked: invertChecked(checked),
        idProduct: e.target.id,
      };
      const apiUrlChecked = getApiUrl("product/checked");
      const updateChecked = await fetch(apiUrlChecked, {
        method: "PUT",
        body: JSON.stringify(dataBody),
        headers: { "content-type": "application/json" },
      });
      getProductsByCategory();
    } catch (error) {
      console.error(error);
    }
  };

  const insertCart = async () => {
    try {
      const apiUrlProducts = getApiUrl("products");
      const getProducts = await fetch(apiUrlProducts);
      const allProducts = await getProducts.json();
      const selectProducts = allProducts.filter(
        (products) => products.checked === true
      );
      const apiUrlCart = getApiUrl("cart");
      const response = await fetch(apiUrlCart, {
        method: "POST",
        body: JSON.stringify(selectProducts),
        headers: { "content-type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    await insertCart();
    // navegate('/')
  };

  return (
    <form className="formProductCheckbox" onSubmit={handleSumit}>
      <input
        className={categoryId ? "sendButtonActive" : "sendButtonDesactive"}
        type="submit"
        value="Actualizar"
        name="send"
      />

      {products.map((product) => (
        <label className="productSelect" key={product.id_product}>
          <input
            id={product.id_product}
            type="checkbox"
            onChange={handleChange}
            checked={product.checked}
          />
          {product.name_product}
        </label>
      ))}
    </form>
  );
}
