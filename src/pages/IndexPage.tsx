import React, { Fragment } from "react";
import { Container, Row, Col } from "../components/react-bootstrap";
import { TableContainer } from "../containers/TableContainer";
export const IndexPage = () => {
  return (
    <Fragment>
      <Container fluid>
        <Row>
          <TableContainer />
        </Row>
      </Container>
    </Fragment>
  );
};
