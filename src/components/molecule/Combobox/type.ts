import { PopoverProps } from '@radix-ui/react-popover';

export interface IProps extends React.FC<PopoverProps> {
  value: string;
  onChange: (value: string) => void;
}
