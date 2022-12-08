import React from "react";
import "./cleanChecked.css";
import { getApiUrl } from "../../../api";

export default function CleanChecked() {
  const handleSumit = async (e) => {
    try {
      const apiUrl = getApiUrl("products/checked/reset");
      const resetChecked = await fetch(apiUrl, {
        method: "PUT",
      });
      window.location.reload();
    } catch (error) {
      console.error();
    }
  };

  return (
    <div className="cleanChecked">
      <button className="buttonClearChecked" onClick={handleSumit}>
        Clear
      </button>
    </div>
  );
}
