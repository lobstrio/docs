interface TableColumn {
  header: string;
  key: string;
  width?: string;
}

interface TableRow {
  [key: string]: string | React.ReactNode;
}

interface CustomTableProps {
  title?: string;
  columns: TableColumn[];
  rows: TableRow[];
}

export default function CustomTable({ title, columns, rows }: CustomTableProps) {
  return (
    <div className="mb-8">
      {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
      <div className="space-y-3">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-surface border border-border rounded-lg p-4"
          >
            <div className="grid gap-4">
              {columns.map((col, colIndex) => (
                <div key={colIndex}>
                  <div className="text-xs text-text-muted uppercase tracking-wider mb-1">
                    {col.header}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {typeof row[col.key] === 'string' && row[col.key].toString().startsWith('**') ? (
                      <code className="text-accent-red font-semibold">
                        {row[col.key].toString().replace(/\*\*/g, '')}
                      </code>
                    ) : (
                      row[col.key]
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
