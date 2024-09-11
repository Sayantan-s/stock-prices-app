import { useState } from 'react';

type THookReturnType = [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
    setSwitchStatus: React.Dispatch<React.SetStateAction<boolean>>;
  },
];

export const useSwitch = (state?: boolean): THookReturnType => {
  const [switchStatus, setSwitchStatus] = useState(state || false);

  const on = () => setSwitchStatus(true);
  const off = () => setSwitchStatus(false);
  const toggle = () => setSwitchStatus((prevState) => !prevState);

  return [switchStatus, { on, off, toggle, setSwitchStatus }];
};
