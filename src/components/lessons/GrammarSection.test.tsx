import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GrammarSection } from './GrammarSection';
import type { GrammarPoint } from '../../types/content';

// Mock useRomanizationToggle so ExampleSentence doesn't fail in tests
vi.mock('../../hooks/useRomanizationToggle', () => ({
  useRomanizationToggle: () => ({
    toggle: vi.fn(),
    isRevealed: () => false,
    hideAll: vi.fn(),
  }),
}));

// Mock AudioButton to avoid audio/settings store dependencies
vi.mock('../ui/AudioButton', () => ({
  AudioButton: () => <button aria-label="Play audio" />,
}));

// Mock useSettingsStore for SpeedToggle (not directly used but imported transitively)
vi.mock('../../store/settings', () => ({
  useSettingsStore: (selector: (s: { audioSpeed: number }) => unknown) =>
    selector({ audioSpeed: 1 }),
}));

const mockParticleGrammar: GrammarPoint = {
  id: 'grm-001',
  title: 'Topic Particle 은/는',
  explanation: 'Marks the topic of a sentence.',
  speech_level: 'polite',
  conjugation_type: 'particle',
  pattern: 'N + 은/는',
  topics: ['top-004'],
  examples: [
    { korean: '저는 학생이에요.', english: 'I am a student.', romanization: 'Jeoneun haksaengieyo.' },
    { korean: '물은 차가워요.', english: 'The water is cold.', romanization: 'Mureun chagawoyo.' },
    { korean: '오늘은 날씨가 좋아요.', english: 'Today the weather is nice.', romanization: 'Oneureun nalssiga joayo.' },
  ],
};

const mockNonParticleGrammar: GrammarPoint = {
  id: 'grm-005',
  title: 'Polite Copula 이에요/예요',
  explanation: 'The polite form of the copula.',
  speech_level: 'polite',
  conjugation_type: 'expression',
  pattern: 'N + 이에요/예요',
  topics: ['top-004'],
  examples: [
    { korean: '저는 학생이에요.', english: 'I am a student.', romanization: 'Jeoneun haksaengieyo.' },
    { korean: '이것은 물이에요.', english: 'This is water.', romanization: 'Igeoseun murieyo.' },
    { korean: '제 이름은 민지예요.', english: 'My name is Minji.', romanization: 'Je ireumeun minjiyeyo.' },
  ],
};

function renderGrammarSection(grammarPoint: GrammarPoint) {
  return render(
    <MemoryRouter>
      <GrammarSection grammarPoint={grammarPoint} />
    </MemoryRouter>
  );
}

describe('GrammarSection', () => {
  it('renders the grammar point title', () => {
    renderGrammarSection(mockParticleGrammar);
    expect(screen.getByText('Topic Particle 은/는')).toBeInTheDocument();
  });

  it('renders the explanation text', () => {
    renderGrammarSection(mockParticleGrammar);
    expect(screen.getByText('Marks the topic of a sentence.')).toBeInTheDocument();
  });

  it('renders the pattern badge', () => {
    renderGrammarSection(mockParticleGrammar);
    expect(screen.getByText('N + 은/는')).toBeInTheDocument();
  });

  it('has an id attribute matching the grammar point id', () => {
    const { container } = renderGrammarSection(mockParticleGrammar);
    // The root div of GrammarSection should have id="grm-001"
    const element = container.querySelector('#grm-001');
    expect(element).not.toBeNull();
  });

  it('renders all example sentences', () => {
    renderGrammarSection(mockParticleGrammar);
    expect(screen.getByText('저는 학생이에요.')).toBeInTheDocument();
    expect(screen.getByText('물은 차가워요.')).toBeInTheDocument();
    expect(screen.getByText('오늘은 날씨가 좋아요.')).toBeInTheDocument();
  });

  it('applies green border color for polite speech level', () => {
    const { container } = renderGrammarSection(mockParticleGrammar);
    const sectionDiv = container.querySelector('#grm-001');
    expect(sectionDiv?.className).toContain('border-green-400');
  });

  it('applies blue border color for formal-high speech level', () => {
    const formalGrammar: GrammarPoint = {
      ...mockParticleGrammar,
      id: 'grm-006',
      speech_level: 'formal-high',
    };
    const { container } = renderGrammarSection(formalGrammar);
    const sectionDiv = container.querySelector('#grm-006');
    expect(sectionDiv?.className).toContain('border-blue-400');
  });

  it('renders ConjugationTable (a table element) for particle-type grammar', () => {
    const { container } = renderGrammarSection(mockParticleGrammar);
    expect(container.querySelector('table')).not.toBeNull();
  });

  it('does NOT render ConjugationTable for non-particle grammar', () => {
    const { container } = renderGrammarSection(mockNonParticleGrammar);
    expect(container.querySelector('table')).toBeNull();
  });
});
