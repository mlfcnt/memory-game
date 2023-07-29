import { Dispatch, ReactNode } from "react";

type Props = {
  setConfig: Dispatch<
    React.SetStateAction<{
      columns: number | null;
      rows: number | null;
    }>
  >;
};

export const GridLengthForm = ({ setConfig }: Props) => {
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const columns = Number((event.target as any).columns.value);
    const rows = Number((event.target as any).rows.value);
    setConfig({ columns, rows });
  };
  return (
    <form
      onSubmit={onFormSubmit}
      style={{
        marginBottom: "100px",
      }}
    >
      <Flex>
        <Flex>
          <label htmlFor="columns">Columns</label>
          <input type="number" id="columns" />
        </Flex>
        <Flex>
          <label htmlFor="rows">Rows</label>
          <input type="number" id="rows" />
        </Flex>
        <button type="submit">Generate</button>
      </Flex>
    </form>
  );
};

const Flex = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "14px",
      }}
    >
      {children}
    </div>
  );
};
