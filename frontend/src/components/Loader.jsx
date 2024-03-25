import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <span className="visually-hidden">Loading...</span>
    </>
  );
}
