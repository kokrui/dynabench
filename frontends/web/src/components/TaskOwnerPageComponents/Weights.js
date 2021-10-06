/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Container, Row, Form, Col, Card, Button } from "react-bootstrap";
import WeightIndicator from "../WeightComponents/WeightIndicator";
import WeightSlider from "../WeightComponents/WeightSlider";

const Weights = (props) => {
  return (
    <Container className="mb-5 pb-5">
      <h1>lol</h1>
      <WeightSlider weight={3} onWeightChange={(a) => console.log(a)} />
    </Container>
  );
};

export default Weights;
