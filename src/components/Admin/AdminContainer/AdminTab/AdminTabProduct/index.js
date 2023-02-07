import React, { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { addProducts } from "../../../../../features/listProducts/listProductsSlice";
import { getLocalStoreToken } from "../../../../../features/localStoreToken/localStoreTokenSlice";
import localStoreToken from "../../../../Utils/localStoreToken";
import { CategorySelect } from "../../../../NewCart/CategorySelect";
import Insert from "../../Insert";
import { getApiUrl } from "../../../../../api";
import "./adminTabProduct.css";

export default function AdminTabProduct() {
  const dispatch = useDispatch();
  const { categoryId } = useSelector((state) => state.categorySelect);
  const { products } = useSelector((state) => state.listProducts);

  const { tokenLocalStore } = useSelector((state) => state.localStoreToken);
  useEffect(() => {
    dispatch(getLocalStoreToken(localStoreToken()));
  }, []);

  useEffect(() => {
    productsByCategory();
  }, [categoryId]);

  const productsByCategory = async () => {
    try {
      if (categoryId > 0) {
        const urlApyCategoryId = getApiUrl(`products/category/${categoryId}`);
        const result = await fetch(urlApyCategoryId, {
          headers: { "x-acces-token": tokenLocalStore },
        });
        if (result.ok) {
          const products = await result.json();
          dispatch(addProducts(products));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnclikDeleteProduct = (idProduct, nameProduct) => {
    try {
      const bodyDelete = {
        id: idProduct,
      };
      Swal.fire({
        title: "Delete",
        text: `Are you sure you want to delete the pruduct ${nameProduct}?`,
        icon: "info",
        showCancelButton: true,
      }).then((response) => {
        if (response.isConfirmed) {
          deleteProduct(bodyDelete);
          Swal.fire({
            text: " The category has been deleted successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    } catch (error) {
      console.error();
    }
  };

  const deleteProduct = async (bodyDelete) => {
    try {
      const urlApiProductDelete = getApiUrl("product/delete");
      const result = await fetch(urlApiProductDelete, {
        method: "PUT",
        body: JSON.stringify(bodyDelete),
        headers: {
          "content-type": "application/json",
          "x-acces-token": tokenLocalStore,
        },
      });
      if (result.ok) {
        productsByCategory();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnClickEdit = async (currentProduct, id) => {
    const { value: editProduct } = await Swal.fire({
      title: "Edit Product",
      input: "text",
      inputLabel: "insert Category",
      inputValue: currentProduct,
      showCancelButton: true,
    });
    if (editProduct) {
      const bodyEdit = {
        product: editProduct,
        id,
      };
      editCategory(bodyEdit);
      await Swal.fire({
        text: "The product has been successfully modified",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const editCategory = async (bodyEdit) => {
    try {
      const urlApiInsertProduct = getApiUrl("product");
      const result = await fetch(urlApiInsertProduct, {
        method: "PUT",
        body: JSON.stringify(bodyEdit),
        headers: {
          "content-type": "application/json",
          "x-acces-token": tokenLocalStore,
        },
      });
      if (result.ok) {
        productsByCategory();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="adminproducts">
        <CategorySelect />
        <Insert className="insert" name="product" />
      </div>
      {products.map((product) => (
        <div className="listProducts" key={product.product_id}>
          <BiEditAlt
            className="iconEditProduct"
            onClick={() => {
              handleOnClickEdit(product.product_name, product.product_id);
            }}
          />
          <RiDeleteBin6Line
            className="iconDeleteProduct"
            onClick={() => {
              handleOnclikDeleteProduct(
                product.product_id,
                product.product_name
              );
            }}
          />
          {product.product_name}
        </div>
      ))}
    </div>
  );
}
