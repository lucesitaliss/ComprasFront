import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategorySelect } from "../../../features/category/categorySlice";
import { getLocalStoreToken } from "../../../features/localStoreToken/localStoreTokenSlice";
import localStoreToken from "../../Utils/localStoreToken";
import { getApiUrl } from "../../../api";
import "./categorySelect.css";

export function CategorySelect() {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useSelector((state) => state.categorySelect);

  const dispatch = useDispatch();

  const { tokenLocalStore } = useSelector((state) => state.localStoreToken);
 
  useEffect(() => {
    dispatch(getLocalStoreToken(localStoreToken()));
  }, []);

  const handleChange = (e) => {
    if (e.target.value > 0) {
      dispatch(addCategorySelect(Number(e.target.value)));
    }
  };

  const getCategories = async () => {
    try {
      const apiUrl = getApiUrl("categories");
      const response = await fetch(apiUrl, {
        headers: {"x-acces-token": tokenLocalStore}
      });
      const result = await response.json();

      setCategories(result);
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="selectContainer">
      <select onChange={handleChange} value={categoryId}>
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>
    </div>
  );
}
