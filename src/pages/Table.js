import React from "react";

const Table = ({ list, tableHeadings, detailHandler }) => {
  return (
    <div className="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            {tableHeadings?.map((item, key) => (
              <th scope="col" className="table-heading" key={key}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list
            ?.sort((a, b) => {
              return a.id - b.id;
            })
            ?.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>{item.description}</td>
                  <td className="details-td">
                    <button
                      className="btn btn-info detail-btn"
                      onClick={() => detailHandler(item.id)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          {!list && <div>No data found</div>}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
