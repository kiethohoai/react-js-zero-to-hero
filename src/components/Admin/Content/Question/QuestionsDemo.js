{
  /* Question Content */
}
<div className="questions-content">
  <div>Add Question</div>
  {/* add questions */}
  <div className="add-questions">
    <div className="input-questions">
      <input
        type="text"
        className="form-control"
        id="add-question"
        placeholder="Question's description"
      />
    </div>

    <div>
      <label htmlFor="formFile" className="form-label">
        <RiFolderUploadFill size={"2em"} />
      </label>
      <input type="file" id="formFile" hidden />
      <span> 0 file is uploaded</span>
    </div>

    <div className="btn-container">
      <button className="btn btn-outline-success">Add</button>
      <button className="btn btn-outline-danger">Del</button>
    </div>
  </div>

  {/* add answers */}
  <div className="add-answers">
    <div>
      <input type="checkbox" name="" id="" />
    </div>
    <div className="input-answers">
      <input
        type="text"
        className="form-control"
        id="add-question"
        placeholder="Answer"
      />
    </div>
    <div className="btn-add-del">
      <button className="btn btn-outline-success">Add</button>
      <button className="btn btn-outline-danger">Del</button>
    </div>
  </div>

  {/* add answers */}
  <div className="add-answers">
    <div>
      <input type="checkbox" name="" id="" />
    </div>
    <div className="input-answers">
      <input
        type="text"
        className="form-control"
        id="add-question"
        placeholder="Answer"
      />
    </div>
    <div className="btn-add-del">
      <button className="btn btn-outline-success">Add</button>
      <button className="btn btn-outline-danger">Del</button>
    </div>
  </div>
</div>;
