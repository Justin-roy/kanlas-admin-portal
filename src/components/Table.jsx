import React, { useState } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineMore,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";
import toast from 'react-hot-toast';
import { useTable, useSortBy, usePagination } from "react-table";
import "../styles/Table.css";
import avatar from "../assets/avatar.png";
import Model from "./Model";
import ApiService from "../ApiService";

const columns = [
  {
    Header: "User",
    accessor: "email",
    Cell: ({ value }) => {
      const [username, domain] = value.split("@");
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            className="avatar-img"
            src={avatar}
            alt="user"
            style={{ marginRight: "10px" }}
          />
          <div>
            <div>{username}</div>
            <div>@{domain}</div>
          </div>
        </div>
      );
    },
  },
  {
    Header: "Amount",
    accessor: "coin",
    Cell: ({ value }) => {
      return <div className="amount-section">Rs.{value}</div>;
    },
  },
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Actions",
    accessor: "actions",
    Cell: ({ row }) => <ActionsCell row={row} />,
  },
];

function ActionsCell({ row }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    try {
      const data = await ApiService.deleteUser(row.values._id);
      if (data.success) {
        console.log(data.message);
        // refreshing window
        window.location.reload();
        toast.success(data.message);
      } else {
        console.log("Delelte failed: ", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Delelte failed:", error);
      toast.error(data.message);
    }
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <>
      <AiFillDelete
      color="#a11d0a"
        size={22}
        style={{ marginRight: "15px" }}
        type="button"
        onClick={(e) => handleDeleteClick(e)}
      />
      <AiFillEdit
        size={22}
        style={{ marginRight: "15px" }}
        onClick={handleEditClick}
      />
      <AiOutlineMore size={22} />
      {isEditing && (
        <Model
          onClose={handleCloseModal}
          userID={row.values._id}
          userEmail={row.values.email}
        />
      )}
    </>
  );
}

function Table({ users }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data: users,
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSortedDesc ? (
                      <AiOutlineArrowUp size={12} />
                    ) : (
                      <AiOutlineArrowDown size={12} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="btn-container">
        <button disabled={!canPreviousPage} onClick={previousPage}>
          Prev
        </button>
        <button disabled={!canNextPage} onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Table;
