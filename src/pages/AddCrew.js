import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const CrewManagement = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [secondDropdownOpen, setSecondDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();
  return (
    <div className="crew-mgmt">
      <button
        className="primary-btn mb-4"
        onClick={() => navigate("/projects")}
      >
        Back
      </button>

      <div className="crew-mgmt-card">
        <div className="crew-flex row">
          <div className="col-md-6 col-lg-3">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <label htmlFor="Project">Project</label>
              <DropdownToggle
                onSelect={(e) => console.log("event ===>", e)}
                caret
              >
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem text>Dropdown Item Text</DropdownItem>
                <DropdownItem disabled>Action (disabled)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="col-md-6 col-lg-3">
            <Dropdown isOpen={secondDropdownOpen}  toggle={toggle}>
              <label htmlFor="Project">Project</label>
              <DropdownToggle
                onSelect={(e) => console.log("event ===>", e)}
                caret
                className=""
              >
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem text>Dropdown Item Text</DropdownItem>
                <DropdownItem disabled>Action (disabled)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="col-md-6 col-lg-3">
            <Dropdown isOpen={secondDropdownOpen}  toggle={toggle}>
              <label htmlFor="Project">Project</label>
              <DropdownToggle
                onSelect={(e) => console.log("event ===>", e)}
                caret
                className=""
              >
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem text>Dropdown Item Text</DropdownItem>
                <DropdownItem disabled>Action (disabled)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="col-md-6 col-lg-3">
            <Dropdown isOpen={secondDropdownOpen}  toggle={toggle}>
              <label htmlFor="Project">Project</label>
              <DropdownToggle
                onSelect={(e) => console.log("event ===>", e)}
                caret
                className=""
              >
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem text>Dropdown Item Text</DropdownItem>
                <DropdownItem disabled>Action (disabled)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewManagement;
