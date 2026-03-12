import type { GrammarPoint } from '../../types/content';

export interface ConjugationRow {
  word: string;
  endingType: 'consonant' | 'vowel';
  particleForm: string;
  result: string;
}

interface ConjugationTableProps {
  grammarPoint: GrammarPoint;
  rows?: ConjugationRow[];
}

export function ConjugationTable({ grammarPoint, rows }: ConjugationTableProps) {
  // Only render for particle-type grammar
  if (grammarPoint.conjugation_type !== 'particle') {
    return null;
  }

  // If no explicit rows provided, derive illustrative rows from the grammar pattern
  const tableRows = rows ?? deriveRows(grammarPoint);

  if (tableRows.length === 0) {
    return null;
  }

  return (
    <div className="my-3 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left px-3 py-2 font-semibold text-gray-600 border border-gray-200">
              Word
            </th>
            <th className="text-left px-3 py-2 font-semibold text-gray-600 border border-gray-200">
              Ends in
            </th>
            <th className="text-left px-3 py-2 font-semibold text-gray-600 border border-gray-200">
              Particle Form
            </th>
            <th className="text-left px-3 py-2 font-semibold text-gray-600 border border-gray-200">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-3 py-2 border border-gray-200 font-medium text-gray-900">
                {row.word}
              </td>
              <td className="px-3 py-2 border border-gray-200 text-gray-600">
                {row.endingType === 'consonant' ? 'Consonant' : 'Vowel'}
              </td>
              <td className="px-3 py-2 border border-gray-200 text-blue-700 font-medium">
                {row.particleForm}
              </td>
              <td className="px-3 py-2 border border-gray-200 text-gray-900">
                {row.result}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Derive illustrative conjugation rows from well-known particle patterns */
function deriveRows(grammarPoint: GrammarPoint): ConjugationRow[] {
  const pattern = grammarPoint.pattern;

  if (pattern.includes('은/는')) {
    return [
      { word: '학생', endingType: 'consonant', particleForm: '은', result: '학생은' },
      { word: '나라', endingType: 'vowel', particleForm: '는', result: '나라는' },
    ];
  }
  if (pattern.includes('이/가')) {
    return [
      { word: '책', endingType: 'consonant', particleForm: '이', result: '책이' },
      { word: '나라', endingType: 'vowel', particleForm: '가', result: '나라가' },
    ];
  }
  if (pattern.includes('을/를')) {
    return [
      { word: '밥', endingType: 'consonant', particleForm: '을', result: '밥을' },
      { word: '물', endingType: 'consonant', particleForm: '을', result: '물을' },
      { word: '커피', endingType: 'vowel', particleForm: '를', result: '커피를' },
    ];
  }
  if (pattern.includes('의')) {
    return [
      { word: '나', endingType: 'vowel', particleForm: '의', result: '나의' },
      { word: '친구', endingType: 'vowel', particleForm: '의', result: '친구의' },
    ];
  }

  return [];
}
