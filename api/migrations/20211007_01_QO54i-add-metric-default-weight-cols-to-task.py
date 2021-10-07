# Copyright (c) Facebook, Inc. and its affiliates.
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

"""
add metric default weight cols to task
"""

from yoyo import step


__depends__ = {"20211006_01_blrx6-add-dynascore-weight-column-to-dataset"}

steps = [
    step(
        "ALTER TABLE tasks ADD COLUMN perf_metric_default_weight "
        + "SMALLINT NOT NULL DEFAULT 4",
        "ALTER TABLE tasks DROP perf_metric_default_weight",
    ),
    step(
        "ALTER TABLE tasks ADD COLUMN throughput_default_weight "
        + "SMALLINT NOT NULL DEFAULT 1",
        "ALTER TABLE tasks DROP throughput_default_weight",
    ),
    step(
        "ALTER TABLE tasks ADD COLUMN memory_default_weight "
        + "SMALLINT NOT NULL DEFAULT 1",
        "ALTER TABLE tasks DROP memory_default_weight",
    ),
    step(
        "ALTER TABLE tasks ADD COLUMN fairness_default_weight SMALLINT DEFAULT 1",
        "ALTER TABLE tasks DROP fairness_default_weight",
    ),
    step(
        "ALTER TABLE tasks ADD COLUMN robustness_default_weight SMALLINT DEFAULT 1",
        "ALTER TABLE tasks DROP robustness_default_weight",
    ),
]
