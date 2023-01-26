import React, { useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import "./adminTabCategory.css";
import { useSelector, useDispatch } from "react-redux";
import { addCategories } from "../../../../../features/listCategory/listCategorySlice";
import Insert from "../../Insert";
import { getApiUrl } from "../../../../../api";

export default function AdminTabCategory() {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.listCategory);

  useEffect(() => {
    allCategories();
  }, []);

  const allCategories = async () => {
    try {
      const urlApiCategories = getApiUrl("categories");
      const result = await fetch(urlApiCategories);
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
        headers: { "content-type": "application/json" },
      });
      if (result.ok) {
        await result.json();
        allCategories();
      }
    } catch (error) {
      
    }
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
    <div>
      <Insert name="category" />
      {categories.map((category) => (
        <div className="listCategories" key={category.category_id}>
          <BiEditAlt
            className="iconEdit"
            onClick={() => {
              handleOnClickEditCategory(
                category.category_name,
                category.category_id
              );
            }}
          />
          <RiDeleteBin6Line
            className="iconDelete"
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
