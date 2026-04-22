import React from "react";

export interface Column<T> {
  key: string;
  label: string;
  render?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    row: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlers?: any,
    page?: number,
    limit?: number,
  ) => React.ReactNode;
  className?: string;
}

type Props<T> = Readonly<{
  data: T[];
  columns: Column<T>[];
  rowKey?: (row: T, index: number) => string | number;
  onRowClick?: (row: T) => void;
  limit?: number;
  page?: number;
  hidingColumns?: string[];
}>;

export function DataTable<T>({
  data,
  columns,
  rowKey = (_, i) => i,
  onRowClick,
  page,
  limit,
  hidingColumns = [],
}: Props<T>) {
  const filteredColumns = columns.filter(
    (col) => !hidingColumns.includes(col.key),
  );

  return (
    <div className="flex flex-col flex-1 min-h-0 shrink-0 w-full rounded-xl border border-panel-border overflow-hidden bg-card">
      <div className="flex min-h-0 w-full overflow-x-auto">
        <table className="min-w-max table-auto border-collapse w-full">
          <thead className="sticky top-0 z-10 bg-secondary">
            <tr>
              {filteredColumns.map((col, j) => (
                <th
                  key={col.key}
                  className={`text-sm p-3 text-left text-ellipsis whitespace-nowrap font-semibold text-white ${
                    col.className
                  } ${
                    j === filteredColumns.length - 1
                      ? "sticky right-0 rounded-tr-xl bg-secondary"
                      : ""
                  } ${j === 0 ? "rounded-tl-xl" : ""}`}
                >
                  <div
                    className={`flex gap-2 ${
                      j === filteredColumns.length - 1 ? "justify-end" : ""
                    }`}
                  >
                    {col.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {data?.map((row, i) => {
              return (
                <tr
                  key={rowKey(row, i)}
                  className="group border-b border-panel-border last:border-0"                  
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {filteredColumns.map((col, j) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const value = (row as any)[col.key];
                    const isLastColumn = j === filteredColumns.length - 1;

                    return (
                      <td
                        key={col?.key}
                        className={`text-sm text-foreground py-2.5 px-3 text-ellipsis whitespace-nowrap bg-card transition-colors group-hover:bg-[#F9FAFB] ${
                          isLastColumn ? "text-right sticky right-0" : ""
                        } ${col.className}`}
                      >
                        {col.render
                          ? col.render(value, row, i, page, limit)
                          : value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
