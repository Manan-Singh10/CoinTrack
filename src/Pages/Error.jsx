import { useNavigate } from "react-router-dom";

function Error({ children }) {
  const navigate = useNavigate();

  return children ? (
    <div> {children} </div>
  ) : (
    <div className="flex flex-col">
      Something went wrong
      <button onClick={() => navigate(-1)}>&larr;</button>
    </div>
  );
}

export default Error;
