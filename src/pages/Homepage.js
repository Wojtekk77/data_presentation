import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
export const Homepage = (props) => {
  return (
    <Row className="justify-content-md-center pt-5">
      <Col xs={4}>
        <div className="card border-secondary mb-3">
          <div className="card-header">
            <h2>Cześć :)</h2>
          </div>
          <div className="card-body text-secondary">
            <h5 className="card-title">Dlaczego zależy mi na tej pracy?</h5>
            <p>
              Na studiach matematycznych często zajęcia wiązały się z
              przerabianiem, kalkulowaniem i prezentacją danych. Co mocno
              wpisywałoby się w opis stanowiska.
            </p>
            <p>
              Do <b>Insert'u</b> chciałbym dołączyć ze względów, że zajmujecie
              się właśnie w dużej mierze pracą z danymi.
            </p>

            <h5 className="card-title">
              Dlaczego rezygnuje z poprzedniej pracy?
            </h5>
            <p>
              Jest kilka powodów dlaczego chce zrezygnować z mojej obecnej
              pracy:
            </p>
            <ul>
              <li>
                pierwszym jest to, że w obecnej pracy muszę robić wszystko i nic
              </li>
              <li>
                drugim natomiast jest fakt, że projekty w których biorę udział
                nie rozwijają mnie i chciałbym robić coś więcej
              </li>
            </ul>
          </div>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
