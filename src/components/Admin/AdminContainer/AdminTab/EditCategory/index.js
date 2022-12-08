import React, { useState } from "react";
import { getApiUrl } from "../../../../../api";

export default function EditCategory(props) {
  const { id } = props;
  const [input, setInput] = useState({
    id: "",
    category: "",
    state_id: "",
  });

  const handleChange = (e) => {
    const info = {
      id: id,
      category: e.target.value,
      state_id: 1,
    };

    setInput(info);
  };

  const handleSumit = async () => {
    const urlApiCategoryUpdate = getApiUrl("categories");
    const result = await fetch(urlApiCategoryUpdate, {
      method: "PUT",
      body: JSON.stringify(input),
    });
    alert("Update Category");
  };
  return (
    <div>
      <form onSubmit={handleSumit}>
        <input placeholder="Name" onChange={handleChange} />
        <input type="submit" value="Edit" />
      </form>
    </div>
  );
}
