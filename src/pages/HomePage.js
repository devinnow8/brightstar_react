import React, { useState } from "react";
import ProjectsList from "../components/ProjectsList";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { name: "one", value: 1 },
    { name: "two", value: 2 },
    { name: "three", value: 3 },
  ];

  function handleSelectChange(event) {
    setSelectedOption(event.target.value);
  }
  return (
    <div className="main-content">
      <ProjectsList />
      <select
        onChange={handleSelectChange}
        class="form-select"
        aria-label="Default select example"
      >
        {options.map((option) => {
          return (
            <option
              selected={selectedOption === option.value}
              value={option.value}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default HomePage;
