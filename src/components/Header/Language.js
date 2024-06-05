import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation, Trans } from "react-i18next";

const Language = (props) => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    console.log("🚀CHECK  file: Language.js:11  i18n.languages[0] =", i18n.languages[0]);
  };

  return (
    <>
      <NavDropdown
        title={i18n.languages[0] === "en" ? "English" : "Tiếng Việt"}
        id="basic-nav-dropdown"
        className="change-language"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>English</NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>Tiếng Việt</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
