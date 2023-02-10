import React, { useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import "./adminTabCategory.css";
import { useSelector, useDispatch } from "react-redux";
import { addCategories } from "../../../../../features/listCategory/listCategorySlice";
import { getLocalStoreToken } from "../../../../../features/localStoreToken/localStoreTokenSlice";
import localStoreToken from "../../../../Utils/localStoreToken";
import Insert from "../../Insert";
import { getApiUrl } from "../../../../../api";

export default function AdminTabCategory() {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.listCategory);
  const { tokenLocalStore } = useSelector((state) => state.localStoreToken);

  useEffect(() => {
    dispatch(getLocalStoreToken(localStoreToken()));
  }, []);

  useEffect(() => {
    allCategories();
  }, []);

  const allCategories = async () => {
    try {
      const urlApiCategories = getApiUrl("categories");
      const result = await fetch(urlApiCategories, {
        headers: { "x-acces-token": tokenLocalStore },
      });
      if (result.ok) {
        const categories = await result.json();
        dispatch(addCategories(categories));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategorie = async (idCategory) => {
    try {
      const urlApiDeleteCategory = getApiUrl(`category/delete/${idCategory}`);
      await fetch(urlApiDeleteCategory, {
        method: "PUT",
        headers: { "x-acces-token": tokenLocalStore },
      });
      allCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnCLickDeleteCategorie = (categoryId, categoryName) => {
    try {
      Swal.fire({
        title: "Delete",
        text: `Are you sure you want to delete the category ${categoryName}?`,
        icon: "info",
        showCancelButton: true,
      }).then((response) => {
        if (response.isConfirmed) {
          deleteCategorie(categoryId);
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

  const editCategory = async (bodyEditCategory) => {
    try {
      const UrlApiCategoryUpdate = getApiUrl("category");
      const result = await fetch(UrlApiCategoryUpdate, {
        method: "PUT",
        body: JSON.stringify(bodyEditCategory),
        headers: {
          "content-type": "application/json",
          "x-acces-token": tokenLocalStore,
        },
      });
      if (result.ok) {
        await result.json();
        allCategories();
      }
    } catch (error) {}
  };

  const handleOnClickEditCategory = async (currentCategory, id) => {
    try {
      const { value: editedCategory } = await Swal.fire({
        title: "Edit Category",
        input: "text",
        inputLabel: "Insert Category",
        inputValue: currentCategory,
        showCancelButton: true,
      });

      if (editedCategory) {
        const bodyEditCategory = {
          id,
          category: editedCategory,
        };
        editCategory(bodyEditCategory);

        await Swal.fire({
          text: "The category has been successfully modified",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="tapCategory">
      <Insert name="category" />
      {categories.map((category) => (
        <div className="listCategories" key={category.category_id}>
          <BiEditAlt
            onClick={() => {
              handleOnClickEditCategory(
                category.category_name,
                category.category_id
              );
            }}
          />
          <RiDeleteBin6Line
            onClick={() => {
              handleOnCLickDeleteCategorie(
                category.category_id,
                category.category_name
              );
            }}
          />
          {category.category_name}
        </div>
      ))}
    </div>
  );
}
