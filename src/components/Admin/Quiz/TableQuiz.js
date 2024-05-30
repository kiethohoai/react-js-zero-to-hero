import _ from "lodash";

const TableQuiz = (props) => {
  const { listQuiz } = props;
  if (_.isEmpty(listQuiz)) {
    return <></>;
  }

  return (
    <>
      {/* List Quiz */}
      <div className="q-list mt-3 ms-2">
        <div style={{ fontSize: "24px", fontWeight: "600" }}>List Quiz</div>
        <div>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {listQuiz &&
                listQuiz.length > 0 &&
                listQuiz.map((item, index) => {
                  return (
                    <tr key={`q-${index}`}>
                      <th>{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.difficulty}</td>
                      <td>
                        <button className="btn btn-outline-success">Update</button>
                        <button className="btn btn-outline-danger ms-2">Delete</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableQuiz;
