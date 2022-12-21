import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProducts } from "../../../features/listProducts/listProductsSlice";
import { addCart } from "../../../features/cart/cartSlice";
//import { useNavigate } from 'react-router-dom'
import "./productCheckbox.css";
import "animate.css";
import { getApiUrl } from "../../../api";

export default function ProductsCheckbox() {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState([]);
  const [loadingListItems, setLoadingListItems] = useState({});
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
      const currentProduct = { [e.target.id]: true };

      setLoadingListItems(...[currentProduct]);
      const updatedCheckedP = await updateChecked.json();
      getProductsByCategory();
      if (updatedCheckedP.finally) {
        setLoadingListItems((e.target.id = false));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const insertCart = async () => {
    try {
      const apiUrlProducts = getApiUrl("products");
      const getProducts = await fetch(apiUrlProducts);
      if (getProducts.ok) {
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
        const postCart = await response.json();
        console.log("postCart", postCart);
        dispatch(addCart(postCart));
      }
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
  };
  return (
    <div className="element">
      <form className="formProductCheckbox" onSubmit={handleSumit}>
        <div className="buttonsContainers">
          <input
            disabled={isChecked.length ? false : true}
            type="submit"
            value="Actualizar"
            name="send"
          />

          <button disabled={isChecked.length ? false : true} onClick={clean}>
            Clear
          </button>
        </div>
        <div className="checkboxContainer">
          {products.map((product) => {
            return (
              <label className="productSelect" key={product.id_product}>
                <input
                  id={product.id_product}
                  type="checkbox"
                  onChange={handleChange}
                  checked={product.checked}
                  className={
                    loadingListItems[product.id_product]
                      ? "animate__animated animate__rubberBand"
                      : "prueba"
                  }
                />
                {product.name_product}
              </label>
            );
          })}
        </div>
      </form>
    </div>
  );
}
