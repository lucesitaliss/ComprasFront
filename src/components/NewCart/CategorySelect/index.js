import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategorySelect } from "../../../features/category/categorySlice";
import { getApiUrl } from "../../../api";
import "./categorySelect.css";

export function CategorySelect() {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useSelector((state) => state.categorySelect);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.value > 0) {
      dispatch(addCategorySelect(Number(e.target.value)));
    }
  };

  const getCategories = async () => { 
    try {
      const apiUrl = getApiUrl("categories");
      const response = await fetch(apiUrl);
      const result = await response.json();
      console.log(result);
      setCategories(result);
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="select">
      <select onChange={handleChange} value={categoryId}>
        <option value="">Seleccione una categoria</option>
        {categories.map((category) => (
          <option key={category.id_category} value={category.id_category}>
            {category.name_category}
          </option>
        ))}
      </select>
    </div>
  );
}
