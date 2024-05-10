import ReactPaginate from "react-paginate";

const TableUserPaginatePaginate = (props) => {
  const {
    listUsers,
    handleClickUpdateModal,
    handleClickViewBtnDisplayUser,
    handleBtnDeleteUser,
    fetchListUsersWithPaginate,
    pageCount,
  } = props;

  // handlePageClick
  const handlePageClick = (event) => {
    console.log(`User requested page number ${event.selected}`);
    fetchListUsersWithPaginate(+event.selected + 1);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleClickViewBtnDisplayUser(user)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-success mx-3"
                      onClick={() => handleClickUpdateModal(user)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleBtnDeleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={"4"}>No Found Users Data</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="user-paginate">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default TableUserPaginatePaginate;
