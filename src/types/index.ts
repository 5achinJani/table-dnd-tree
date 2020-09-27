/**
 * @description user defined types
 */

export type IData = IDataRow[];

export type IDataRow = {
  /**
   * @description cuid
   */
  id: string;
  body: string;
  indent: number;
};
