import { useState } from "react";

export const useToggleState = (
  initialState: boolean
): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialState);

  const toggleState = () => {
    setState((state) => !state);
  };

  return [state, toggleState];
};
