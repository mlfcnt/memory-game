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

    if ((columns * rows) % 2 !== 0) {
      alert("You must provide an even number of cards");
      return;
    }
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
          <input type="number" id="columns" defaultValue={4} />
        </Flex>
        <Flex>
          <label htmlFor="rows">Rows</label>
          <input type="number" id="rows" defaultValue={3} />
        </Flex>
        <button type="submit">Generate grid</button>
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
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};
