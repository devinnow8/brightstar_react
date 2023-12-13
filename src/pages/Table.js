import React from "react";

const Table = ({ list }) => {
  console.log("list", list);
  return (
    <div className="table-responsive">
      <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">S.No</th>
          <th scope="col">Name</th>
          <th scope="col">Status</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        {list?.map((item, key) => {
          return (
            <tr key={key}>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>{item.description}</td>
              <td><button className="btn btn-info detail-btn">Details</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
