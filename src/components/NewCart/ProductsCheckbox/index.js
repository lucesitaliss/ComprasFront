import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProducts } from "../../../features/listProducts/listProductsSlice";
import { changeCheckedAccion } from "../../../features/listProducts/listProductsSlice";
import { addCart } from "../../../features/cart/cartSlice";
import { getLocalStoreToken } from "../../../features/localStoreToken/localStoreTokenSlice";
import { Redirect } from "react-router-dom";
import "./productCheckbox.css";
import "animate.css";
import { getApiUrl } from "../../../api";
import localStoreToken from "../../Utils/localStoreToken";

export default function ProductsCheckbox() {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState([]);
  const [loadingListItems, setLoadingListItems] = useState({});
  const [loadingProducts, setLoadingProducts] = useState("");
  const { categoryId } = useSelector((state) => state.categorySelect);
  const { products } = useSelector((state) => state.listProducts);
  const { tokenLocalStore } = useSelector((state) => state.localStoreToken);
  const { cart } = useSelector((state) => state.cart);

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    dispatch(getLocalStoreToken(localStoreToken()));
  }, []);

  useEffect(() => {
    categoryId && getProductsByCategory();
  }, [categoryId]);

  useEffect(() => {
    products && changeChecked();
  }, [products]);

  const getProductsByCategory = async () => {
    try {
      if (categoryId > 0) {
        const apiUrl = getApiUrl(`products/category/${categoryId}`);
        setLoadingProducts(true);
        const response = await fetch(apiUrl, {
          headers: { "x-acces-token": tokenLocalStore },
        });
        const result = await response.json();
        dispatch(addProducts(result));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleChange = async (e) => {
    try {
      const dataBody = {
        checkedValue: e.target.checked,
        productId: e.target.id,
      };

      setLoadingListItems((prev) => ({
        ...prev,
        [e.target.id]: true,
      }));

      const apiUrlChecked = getApiUrl("product/checked");
      const updateChecked = await fetch(apiUrlChecked, {
        method: "PUT",
        body: JSON.stringify(dataBody),
        headers: {
          "content-type": "application/json",
          "x-acces-token": tokenLocalStore,
        },
      });

      if (updateChecked.ok) {
        const updateProduct = await updateChecked.json();
        dispatch(changeCheckedAccion(updateProduct[0]));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingListItems((prev) => ({
        ...prev,
        [e.target.id]: false,
      }));
    }
  };

  const insertCart = async () => {
    try {
      const apiUrlProducts = getApiUrl("products");
      const getProducts = await fetch(apiUrlProducts, {
        headers: {
          "x-acces-token": tokenLocalStore,
        },
      });
      if (getProducts.ok) {
        const allProducts = await getProducts.json();
        const selectProducts = allProducts.filter(
          (products) => products.checked === true
        );
        const apiUrlCart = getApiUrl("cart");
        const response = await fetch(apiUrlCart, {
          method: "POST",
          body: JSON.stringify(selectProducts),
          headers: {
            "content-type": "application/json",
            "x-acces-token": tokenLocalStore,
          },
        });
        const postCart = await response.json();
        if (response.ok) {
          dispatch(addCart(postCart));
          // setShouldRedirect(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    insertCart();
  };

  const clean = async (e) => {
    try {
      const apiUrl = getApiUrl("products/checked/reset");
      const resetChecked = await fetch(apiUrl, {
        method: "PUT",
        headers: { "x-acces-token": tokenLocalStore },
      });

      if (resetChecked.ok) {
        await resetChecked.json();
        getProductsByCategory();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeChecked = () => {
    if (categoryId) {
      const checked = products.filter((product) => product.checked === true);
      setIsChecked(checked);
    }
  };

  // if (shouldRedirect) {
  //   return <Redirect to="/Cart" />;
  // }

  return (
    <div className="container">
      <form className="formProductCheckbox" onSubmit={handleSumit}>
        <div className="buttonsContainers">
          <input
            disabled={!isChecked.length}
            type="submit"
            value={cart ? "Actualizar" : "Create List"}
            name="send"
          />
          <button disabled={!isChecked.length} onClick={clean}>
            Clear
          </button>
        </div>

        {loadingProducts ? (
          <div className="containerSpinner">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="checkboxContainer">
            {products.map((product) => {
              return (
                <label className="productSelect" key={product.product_id}>
                  <input
                    id={product.product_id}
                    type="checkbox"
                    onChange={handleChange}
                    checked={product.checked}
                    className={
                      loadingListItems[product.product_id] ? "checkboxSpin" : ""
                    }
                  />

                  {product.product_name}
                </label>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
}
