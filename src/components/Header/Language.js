import NavDropdown from "react-bootstrap/NavDropdown";

const Language = (props) => {
  return (
    <>
      <NavDropdown title="Việt Nam" id="basic-nav-dropdown" className="change-language">
        <NavDropdown.Item>English</NavDropdown.Item>
        <NavDropdown.Item>Vietnamese</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
