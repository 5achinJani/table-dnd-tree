import { IData } from "../types";

type IMoveArrayItemsParams = {
  array: any[];
  /**
   * @description target index position that you want to move your items.
   */
  target_index: number;
  source_from_index: number;
  source_to_index: number;
};

export const moveArrayElements = (params: IMoveArrayItemsParams) => {
  if (!params) {
    throw new Error("arg params object is required");
  }
  if (!Array.isArray(params?.array)) {
    throw new Error("arg params.array is not an array");
  }
  const {
    array = [],
    target_index,
    source_from_index,
    source_to_index,
  } = params;
  if (source_from_index == target_index && source_to_index == target_index) {
    console.log("All same");
    return array;
  }
  const res = array.reduce((acc, currentValue, currentIndex) => {
    if (currentIndex >= source_from_index && currentIndex <= source_to_index) {
      //part of source to and from then ignore
      console.log({ currentIndex });
    } else if (target_index === currentIndex) {
      //target_index
      const source = array.slice(source_from_index, source_to_index + 1);
      console.log({ source });
      if (target_index < source_from_index) {
        console.log("target_index < source_from_index");
        acc.push(...source, array[target_index]);
      } else {
        console.log("target_index >>>>>>>>>");
        acc.push(array[target_index], ...source);
      }

      //acc.push(...source, array[target_index]);
    } else {
      acc.push(currentValue);
    }

    return acc;
  }, []);
  console.log(res);
  return res;
};

/**
 *
 * @returns the index of source(source_from_index) and its last child(source_to_index)
 */
export const getSourceValues = ({
  source_from_index,
  array,
}: {
  source_from_index: number;
  array: IData;
}) => {
  let source_to_index: number = source_from_index;
  for (let index = source_from_index + 1; index < array.length; index++) {
    const element = array[index];

    if (element.indent <= array[source_from_index].indent) {
      break;
    } else {
      source_to_index = index;
    }
  }
  return { source_from_index, source_to_index };
};
