import React from "react";
// import { useSelector } from "react-redux";
import { CategorySelect } from "./CategorySelect";
import ProductsCheckbox from "./ProductsCheckbox/index";

import "./newCart.css";

export default function NewCart() {
  // const { categoryId } = useSelector((state) => state.categorySelect);
  return (
    <div className="newCart">
      <CategorySelect />
      <ProductsCheckbox />
    </div>
  );
}
