"use client";

interface QuestionCardProps {
  question: string;
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export default function QuestionCard({
  question,
  options,
  selected,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="p-5 border rounded-2xl shadow-sm bg-gray-50 transition-all duration-200 hover:shadow-md">
      <h2 className="font-semibold text-gray-800">{question}</h2>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {options.map((op) => (
          <button
            key={op}
            onClick={() => onSelect(op)}
            className={`p-3 rounded-xl border text-sm transition-all 
              ${
                selected === op
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : "bg-white border-gray-300"
              }
            `}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}
