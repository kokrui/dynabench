# Copyright (c) Facebook, Inc. and its affiliates.
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

"""
add dynascore weight column to dataset
"""

from yoyo import step


__depends__ = {"20210929_01_AKPlZ-update-qa-f1-threshold-to-0-4"}

steps = [
    step(
        "ALTER TABLE datasets ADD COLUMN weight SMALLINT DEFAULT 5 "
        + "CHECK (weight>=0 AND weight<=5)",
        "ALTER TABLE datasets DROP weight",
    )
]
