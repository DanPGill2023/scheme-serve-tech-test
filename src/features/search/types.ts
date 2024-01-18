export type SearchBarProps = {
  onSubmit: React.FormEventHandler;
  onChange: React.ChangeEventHandler;
  search: string;
};

export type HistoricSearchProps = {
  onClickPostcode: (postcode: string) => void;
  onClickRemovePostcode: (postcode: string) => void;
};
