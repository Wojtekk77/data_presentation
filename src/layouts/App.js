import { Col, Row, Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Header.js";
import Page from "./Page";
import Footer from "./Footer";
import AsideNavigation from "./Navigation/AsideNavigation";

function App() {
  return (
    <Router>
      <header>
        <Header />
      </header>
      <main>
        <Container fluid>
          <Row>
            <Col xs={1} id="sidebar-wrapper" className="bg-light px-0">
              <aside className="h-100">
                <AsideNavigation />
              </aside>
            </Col>
            <Col xs={11}>
              <Page />
            </Col>
          </Row>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
