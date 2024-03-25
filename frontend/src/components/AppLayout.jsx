import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Container className="py-2">
        <Outlet />
      </Container>
    </div>
  );
}
