import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProducts } from "../../../features/listProducts/listProductsSlice";
//import { useNavigate } from 'react-router-dom'
import "./productCheckbox.css";
import { getApiUrl } from "../../../api";

export default function ProductsCheckbox() {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState([]);
  const { categoryId } = useSelector((state) => state.categorySelect);
  const { products } = useSelector((state) => state.listProducts);

  useEffect(() => {
    categoryId && getProductsByCategory();
  }, [categoryId]);

  useEffect(() => {
    products && changeChecked();
  }, [products]);

  // const navegate = useNavigate()
  const getProductsByCategory = async () => {
    if (categoryId > 0) {
      const apiUrl = getApiUrl(`products/category/${categoryId}`);
      const response = await fetch(apiUrl);
      const result = await response.json();
      //setProducts(result);
      dispatch(addProducts(result));
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

  const clean = async (e) => {
    try {
      const apiUrl = getApiUrl("products/checked/reset");
      const resetChecked = await fetch(apiUrl, {
        method: "PUT",
      });

      if (resetChecked.ok) {
        const resetProducts = await resetChecked.json();
        getProductsByCategory();
      }
    } catch (error) {
      console.error();
    }
  };

  const changeChecked = () => {
    if (categoryId) {
      const checked = products.filter((product) => product.checked === true);
      setIsChecked(checked);
    }
    const checked = products.filter((product) => product.checked === true);
    console.log(checked);
    if (("checked", checked)) {
      setIsChecked(checked);
    }
  };
  return (
    <form className="formProductCheckbox" onSubmit={handleSumit}>
      <div className="buttonsContainers">
        <input
          className={
            isChecked.length ? "sendButtonActive" : "sendButtonDesactive"
          }
          type="submit"
          value="Actualizar"
          name="send"
        />

        <button
          className={
            isChecked.length
              ? "buttonClearCheckedActive"
              : "buttonClearCheckedInactive"
          }
          onClick={clean}
        >
          Clear
        </button>
      </div>

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
