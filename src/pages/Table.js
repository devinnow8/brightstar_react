import React from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ list, abc,detailHandler }) => {
  const navigate = useNavigate();
  

  return (
    <div className="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
          {abc.map((item, key) => (
            <th scope="col" key={key}>
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
            .map((item, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{item.id}</th>
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
        </tbody>
      </table>
    </div>
  );
};

export default Table;
