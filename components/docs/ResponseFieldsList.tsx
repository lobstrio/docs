'use client';

interface ResponseField {
  path: string;
  type?: string;
  description: string;
  example?: string;
}

interface ResponseFieldsListProps {
  title: string;
  fields: ResponseField[];
}

export default function ResponseFieldsList({ title, fields }: ResponseFieldsListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={index}
            className="bg-surface border border-border rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <code className="text-base text-accent-blue font-semibold">
                  {field.path}
                </code>
                {field.type && (
                  <span className="text-sm text-text-muted ml-2">
                    {field.type}
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-text-secondary">{field.description}</p>
            {field.example && (
              <div className="mt-2">
                <span className="text-xs text-text-muted">Example: </span>
                <code className="text-sm text-accent-green">
                  {field.example}
                </code>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
