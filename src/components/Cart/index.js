import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import { getApiUrl } from "../../api";
import "./cart.css";

export default function Cart() {
  const [selectProduct, setSelectProduct] = useState({});
  // const navegate = useNavigate()

  useEffect(() => {
    getProductsSelections();
  }, []);

  const getProductsSelections = async () => {
    try {
      const urlApiCart = getApiUrl("cart");
      const response = await fetch(urlApiCart);
      const result = await response.json();
      if (response.ok) {
        setSelectProduct(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const insertHistorycart = async () => {
    try {
      const urlApiHistory = getApiUrl("history");
      const response = await fetch(urlApiHistory, {
        method: "POST",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCart = async () => {
    const urlApiCart = getApiUrl("cart");
    const response = await fetch(urlApiCart, {
      method: "DELETE",
    });

    if (response.ok) {
      setSelectProduct([]);
    }
  };

  const handleSumitCleanList = (e) => {
    e.preventDefault();
    insertHistorycart();
    deleteCart();
    // navegate('/')
  };

  const handleSubmitProductList = async (id, selected) => {
    try {
      const bodyParams = {
        id,
        selected,
      };
      const urlApiCart = getApiUrl("cart");
      const response = await fetch(urlApiCart, {
        method: "PUT",
        body: JSON.stringify(bodyParams),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        getProductsSelections();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetCheckedProduct = async (id) => {
    const urlApiResetCheked = getApiUrl(`product/checked/reset/id/${id}`);
    const response = await fetch(urlApiResetCheked, {
      method: "PUT",
    });
  };

  const deleteCartById = async (id) => {
    const urlApiCartId = getApiUrl(`cart/${id}`);
    const response = await fetch(urlApiCartId, {
      method: "DELETE",
    });
    if (response.ok) {
      getProductsSelections();
    }
  };

  const handleSubmitDeleteCartById = (nameCart, idCart, idProduct) => {
    try {
      Swal.fire({
        title: "Delete",
        text: `Are you sure you want to delete the product ${nameCart} ?`,
        icon: "info",
        buttons: ["cancel", "Acept"],
      }).then((response) => {
        if (response) {
          DeleteCartById(idCart, idProduct);
          Swal.fire({
            text: "The category has been deleted successfully",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteCartById = (idCart, idProduct) => {
    deleteCartById(idCart);
    resetCheckedProduct(idProduct);
  };

  return (
    <div>
      <div className="titelButton">
        <h2>Lista de Compras </h2>
        <form onSubmit={handleSumitCleanList}>
          <input
            className="ButtonEmptyList"
            type="submit"
            value="Vaciar Lista"
          />
        </form>
      </div>

      {Object.entries(selectProduct).map((categories) => (
        <div className="containerList">
          <h3 className="titleCategory" key="categories.id_category">
            {categories?.[0]}
          </h3>
          {categories?.[1].map((product) => (
            <div className="cartList" key={product.product_id}>
              <RiDeleteBin6Line
                className="iconDeleteCart"
                onClick={() => {
                  handleSubmitDeleteCartById(
                    product.name_product,
                    product.id_cart,
                    product.product_id
                  );
                }}
              />
              <h5
                onClick={() => {
                  handleSubmitProductList(product.id_cart, product.selected);
                }}
                className={
                  product.selected ? "throughProductList" : "productList"
                }
              >
                {product.name_product}
              </h5>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
