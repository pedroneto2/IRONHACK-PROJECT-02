import "./PageNotFound.css";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import notFound from "../../images/not_found.gif";

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <div className="text-container">
        <h1>
          <ErrorOutlineIcon /> 404 Not Found
        </h1>
      </div>
      <img src={notFound} alt="page not found" />
    </div>
  );
};

export default PageNotFound;
