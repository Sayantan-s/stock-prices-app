export interface IStockSelectorProps {
  value: string;
  onChange: (value: string) => void;
  formerStockValue: string;
}

export interface IStockEntities {
  entity1: string;
  entity2: string;
}
export interface IProps extends IStockEntities {
  onChange: (props: IStockEntities) => void;
}
