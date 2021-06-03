/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, useState, useEffect } from "react";
import "./TaskPage.css";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Nav,
  Spinner,
} from "react-bootstrap";
import UserContext from "./UserContext";
import { OverlayProvider, Annotation, OverlayContext } from "./Overlay";
import FloresActionButtons from "../components/Buttons/FloresActionButtons";
import FloresModelLeaderBoard from "../components/FloresComponents/FloresModelLeaderboard";
import FloresTaskDescription from "../components/FloresComponents/FloresTaskDescription";

const FLORES_TASK_SHORT_NAMES = [
  "FLORES-FULL",
  "FLORES-SMALL1",
  "FLORES-SMALL2",
];

const TaskNav = ({ location, taskLookup, taskId, setTask }) => {
  return (
    <Nav className="flex-lg-column sidebar-wrapper sticky-top">
      {FLORES_TASK_SHORT_NAMES.map((name) => {
        const task = taskLookup[name];
        return (
          <Nav.Item>
            <Nav.Link
              href={`#${task.id}`}
              onClick={(e) => {
                e.preventDefault();
                setTask(task);
                // location.hash = `${t.id}`;
              }}
              className={`${
                taskId === task.id ? "active" : ""
              } gray-color p-3 px-lg-5`}
            >
              {task.name}
            </Nav.Link>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

const FloresTaskPage = (props) => {
  const context = useContext(UserContext); // for API
  const [taskLookup, setTaskLookup] = useState({}); // All Flores Tasks
  const [task, setTask] = useState(null); // Current Task ID
  const [isLoading, setIsLoading] = useState(false);

  // Call api only once
  useEffect(() => {
    /**
     * Invoke APIService to fetch Flores Tasks
     *
     * @param {*} api instance of @see APIService
     * @param {number} page
     */
    const fetchFloresTasks = (api) => {
      setIsLoading(true);
      api.getSubmittableTasks().then(
        (result) => {
          const floresTasks = result.filter((t) =>
            FLORES_TASK_SHORT_NAMES.includes(t.shortname)
          );
          const taskLookup = floresTasks.reduce(
            (map, obj) => ((map[obj.shortname] = obj), map),
            {}
          );

          setTaskLookup(taskLookup);

          setTask(taskLookup[FLORES_TASK_SHORT_NAMES[0]]); // set default task
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
          setIsLoading(false);
        }
      );
    };

    fetchFloresTasks(context.api);

    return () => {};
  }, [context.api]);

  if (isLoading || !task) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <OverlayProvider initiallyHide={true} delayMs="1700">
      <Container fluid>
        <Row>
          <Col lg={2} className="p-0 border">
            <Annotation
              placement="bottom-start"
              tooltip="The FLoRes task has multiple tracks. You can look at other tracks here"
            >
              <TaskNav
                {...props}
                taskLookup={taskLookup}
                taskId={task.id}
                setTask={setTask}
              />
            </Annotation>
          </Col>
          <Col lg={10} className="px-4 px-lg-5">
            <h2 className="task-page-header text-reset ml-0">FLoRes</h2>
            <div style={{ float: "right", marginTop: 30 }}>
              <ButtonGroup>
                <Annotation
                  placement="left"
                  tooltip="Click to show help overlay"
                >
                  <OverlayContext.Consumer>
                    {({ hidden, setHidden }) => (
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm btn-help-info"
                        onClick={() => {
                          setHidden(!hidden);
                        }}
                      >
                        <i className="fas fa-question"></i>
                      </button>
                    )}
                  </OverlayContext.Consumer>
                </Annotation>
              </ButtonGroup>
            </div>
            <p>
              {" "}
              FLoRes is a benchmark dataset for machine translation between
              English and low-resource languages.{" "}
            </p>
            <hr />
            <FloresTaskDescription taskId={task.id} />
            <FloresActionButtons
              api={context.api}
              taskId={task.id}
              user={context.user}
            />
            <p>
              The training data is provided by the publicly available Opus
              repository, which contains data of various quality from a variety
              of domains. We also provide in-domain Wikipedia monolingual data
              for each language. nn All tracks will be fully constrained, so
              only the data that is provided can be used. This will enable
              fairer comparison across methods. Check the{" "}
              <a href="http://data.statmt.org/wmt21/multilingual-task/">
                multilingual data page
              </a>{" "}
              for a detailed view of the resources.
            </p>

            <Row>
              <Annotation
                placement="left"
                tooltip="This shows how models have performed on a specific track"
              >
                <FloresModelLeaderBoard
                  {...props}
                  taskTitle={task?.name}
                  taskId={task.id}
                />
              </Annotation>
            </Row>
          </Col>
        </Row>
      </Container>
    </OverlayProvider>
  );
};

export default FloresTaskPage;
