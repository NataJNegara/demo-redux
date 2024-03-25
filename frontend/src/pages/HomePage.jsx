import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Card className="w-75 m-auto py-5 mt-5 text-center">
      <h1>MERN - AUTH REDUX</h1>
      <Card.Body>
        This is mern app for demo redux and store jwt in HTTP-Only cookie
      </Card.Body>

      {!userInfo && (
        <div className="d-flex justify-content-center gap-4">
          <LinkContainer to="/register">
            <Button variant="secondary">Sign up</Button>
          </LinkContainer>

          <LinkContainer to="/login">
            <Button variant="primary">Sign In</Button>
          </LinkContainer>
        </div>
      )}
    </Card>
  );
}
