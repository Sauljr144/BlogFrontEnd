import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import Dashboard from "./components/Dashboard";
import BlogPage from "./components/BlogPage";

function App() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">Our Blog</h1>
          </Col>
          {/* <Dashboard /> */}
          <BlogPage/>
        </Row>
      </Container>
    </>
  );
}

export default App;
