import React, { useState, Fragment } from "react";
import { IData } from "../types";

export const TableContainer = () => {
  const [data, setData] = useState<IData>([]);

  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th>The table header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The table body</td>
            <td>with two columns</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};
