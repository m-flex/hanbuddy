import type { Dialogue } from '../types/content';

export const DIALOGUES = [
  {
    id: 'dlg-001',
    title: 'At the Coffee Shop',
    description: 'Order a coffee and ask for the price at a Korean cafe.',
    topics: ['top-003'],
    vocab_ids: ['voc-016', 'voc-018', 'voc-019'],
    lines: [
      {
        speaker: 'Barista',
        korean: '안녕하세요! 어서 오세요.',
        english: 'Hello! Welcome.',
        romanization: 'Annyeonghaseyo! Eoseo oseyo.',
      },
      {
        speaker: 'Customer',
        korean: '안녕하세요. 아메리카노 한 잔 주세요.',
        english: 'Hello. Please give me one Americano.',
        romanization: 'Annyeonghaseyo. Amerikano han jan juseyo.',
      },
      {
        speaker: 'Barista',
        korean: '뜨거운 걸로 드릴까요, 차가운 걸로 드릴까요?',
        english: 'Would you like it hot or iced?',
        romanization: 'Ddeugeoun geollo deurilkkayo, chagaun geollo deurilkkayo?',
      },
      {
        speaker: 'Customer',
        korean: '차가운 걸로 주세요.',
        english: 'Iced, please.',
        romanization: 'Chagaun geollo juseyo.',
      },
      {
        speaker: 'Customer',
        korean: '얼마예요?',
        english: 'How much is it?',
        romanization: 'Eolmayeyo?',
      },
      {
        speaker: 'Barista',
        korean: '사천오백 원이에요.',
        english: 'It\'s 4,500 won.',
        romanization: 'Sacheon-obaek woniеyo.',
      },
    ],
  },
  {
    id: 'dlg-002',
    title: 'Meeting Someone New',
    description: 'Introduce yourself and exchange names in Korean.',
    topics: ['top-001'],
    vocab_ids: ['voc-001', 'voc-009', 'voc-003'],
    lines: [
      {
        speaker: 'Person A',
        korean: '안녕하세요! 저는 민준이에요.',
        english: 'Hello! I\'m Minjun.',
        romanization: 'Annyeonghaseyo! Jeoneun Minjunieyo.',
      },
      {
        speaker: 'Person B',
        korean: '안녕하세요! 저는 수진이에요.',
        english: 'Hello! I\'m Sujin.',
        romanization: 'Annyeonghaseyo! Jeoneun Sujiniеyo.',
      },
      {
        speaker: 'Person A',
        korean: '혹시 한국 사람이에요?',
        english: 'Are you Korean by any chance?',
        romanization: 'Hoksi hanguk saramieyo?',
      },
      {
        speaker: 'Person B',
        korean: '네, 맞아요. 한국 사람이에요.',
        english: 'Yes, that\'s right. I\'m Korean.',
        romanization: 'Ne, majayo. Hanguk saramieyo.',
      },
      {
        speaker: 'Person A',
        korean: '만나서 반가워요.',
        english: 'Nice to meet you.',
        romanization: 'Mannaseo bangawoyo.',
      },
      {
        speaker: 'Person B',
        korean: '저도 반가워요. 감사합니다.',
        english: 'Nice to meet you too. Thank you.',
        romanization: 'Jeodo bangawoyo. Gamsahamnida.',
      },
    ],
  },
  {
    id: 'dlg-003',
    title: 'Asking for Directions',
    description: 'Ask a local for directions to a nearby place.',
    topics: ['top-005'],
    vocab_ids: ['voc-008', 'voc-020', 'voc-003'],
    lines: [
      {
        speaker: 'Traveler',
        korean: '실례합니다. 지하철역이 어디에 있어요?',
        english: 'Excuse me. Where is the subway station?',
        romanization: 'Sillyehamnida. Jihacheolyeogi eodie isseoyo?',
      },
      {
        speaker: 'Local',
        korean: '저기 길을 따라가면 있어요.',
        english: 'Go along that road and it\'s there.',
        romanization: 'Jeogi gireul ddaragamyeon isseoyo.',
      },
      {
        speaker: 'Traveler',
        korean: '걸어서 얼마나 걸려요?',
        english: 'How long does it take on foot?',
        romanization: 'Georeoseo eolmana geollyeoyo?',
      },
      {
        speaker: 'Local',
        korean: '오 분 정도요. 감사합니다.',
        english: 'About 5 minutes. Thank you.',
        romanization: 'O bun jeongdoyo. Gamsahamnida.',
      },
    ],
  },
] satisfies Dialogue[];
