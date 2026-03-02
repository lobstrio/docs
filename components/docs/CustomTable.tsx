import { CustomTableProps } from "@/lib/types/docs.type";

export default function CustomTable({ title, columns, rows }: CustomTableProps) {
  return (
    <div className="mb-8">
      {title && <h2 className="text-3xl font-bold mb-5">{title}</h2>}
      <div className="space-y-5">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-[#f2f5f980] border border-[#dde1ee] rounded-lg p-5"
          >
            <div className="grid gap-5">
              {columns.map((col, colIndex) => {
                const value = row[col.key];
                const isHighlighted = typeof value === 'string' && value.startsWith('**');
                return (
                  <div key={colIndex}>
                    <div className="text-base leading-[1.31] font-semibold opacity-40 uppercase tracking-wider mb-[5px]">
                      {col.header}
                    </div>
                    <div className="text-base leading-[1.31]">
                      {isHighlighted ? (
                        <span className="text-[#ff0000] text-base leading-[1.31] font-bold uppercase">
                          {(value as string).replace(/\*\*/g, '')}
                        </span>
                      ) : (
                        value
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
