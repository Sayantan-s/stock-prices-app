import { FC } from 'react';

export interface IProps {
  name: string;
}

export const NoOp: FC<IProps> = ({ name }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex-1 mt-4 text-neutral-800">{name} :: No Operation</div>
    </div>
  );
};
