import { useState } from 'react';

interface Author {
  ko: string;
  en?: string;
}

interface Paper {
  titleKo: string;
  titleEn?: string;
  authors: Author[];
  category?: string;
  meta?: string;
  publication?: string;
}

const papersData: Paper[] = [
  {
    titleKo:
      'A Real-Time Data-Driven Multimedia Platform Integrating Public Data and AI-Based Facial Generation for Personalized Interaction',
    authors: [
      { ko: '나정조', en: 'Jungjo Na' },
      { ko: '김미소', en: 'Miso Kim' },
      { ko: '김현규', en: 'Hyeon Gyu Kim' },
    ],
    category: 'IEEE Paper',
    meta: '2025.12 · IEEE Published',
  },
  {
    titleKo: '숏폼의 AI 사용 공개 여부가 시청자의 지속적 시청 의지에 미치는 영향',
    titleEn: "Effect of AI Disclosure in Short-Form Content on Viewers' Continued Watching Intention",
    authors: [
      { ko: '오유림', en: 'Yurim Oh' },
      { ko: '나정조', en: 'Jungjo Na' },
    ],
    category: 'Journal Article',
    meta: '2025.06 · 디지털콘텐츠학회논문지',
  },
  {
    titleKo: 'VGA 분석을 통한 몰입형 VR 전시공간의 공간 구성 연구',
    titleEn: 'A Study on Spatial Configuration of Immersive VR Exhibition Spaces Using VGA Analysis',
    authors: [
      { ko: '이승현', en: 'Seunghyun Lee' },
      { ko: '나정조', en: 'Jungjo Na' },
    ],
    category: 'Journal Article',
    meta: '2025.06 · 전시디자인연구',
  },
  {
    titleKo: '공연예술에 사용된 애니메트로닉스 로봇의 활용 사례 분석',
    titleEn: 'Case Analysis of Animatronic Robots in Performing Arts',
    authors: [
      { ko: '김예린', en: 'Yerin Kim' },
      { ko: '나정조', en: 'Jungjo Na' },
    ],
    category: 'Journal Article',
    meta: '2025.06 · 전시디자인연구',
  },
  {
    titleKo: 'Kinect 기반 인터랙티브 아트를 통한 인간 역동성의 시각화',
    titleEn: 'Visualization of Human Dynamics through Kinect-based Interactive Art',
    authors: [
      { ko: '오유림', en: 'Yurim Oh' },
      { ko: '윤해주', en: 'Haeju Yoon' },
      { ko: '이승현', en: 'Seunghyun Lee' },
      { ko: '나정조', en: 'Jungjo Na' },
    ],
    category: 'Journal Article',
    meta: '2025.06 · 전시디자인연구',
  },
  {
    titleKo: '브랜드 정체성 강화를 위한 스페이스 브랜딩에서의 미디어아트 활용 연구',
    titleEn: 'A Study on the Utilization of Media Art in Space Branding to Enhance Brand Identity',
    authors: [
      { ko: '김미소', en: 'Miso Kim' },
      { ko: '나정조', en: 'Jungjo Na' },
    ],
    category: 'Journal Article',
    meta: '2025.05 · 디지털콘텐츠학회논문지',
  },
  {
    titleKo: '트래커와 인공지능을 활용한 체험형 미디어 아트',
    titleEn: 'Experiential media art using trackers and artificial intelligence',
    authors: [
      { ko: '김수민', en: 'Sumin Kim' },
      { ko: '오유림', en: 'Yurim Oh' },
      { ko: '윤해주', en: 'Haeju Yoon' },
      { ko: '한가윤', en: 'Gayun Han' },
      { ko: '나정조', en: 'Jungjo Na' },
    ],
    category: 'Conference Proceedings',
    meta: '2024.01 · 한국HCI학회',
  },
];

const ITEMS_PER_PAGE = 5;

function formatAuthors(authors: Author[]) {
  return authors.map((author) => (author.en ? `${author.ko}(${author.en})` : author.ko)).join(', ');
}

export default function Papers() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(papersData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPapers = papersData.slice(startIndex, endIndex);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-foreground/45">Publications</p>
          <h1>논문</h1>
        </div>

        <div className="space-y-6">
          {currentPapers.map((paper, index) => (
            <div
              key={startIndex + index}
              className="rounded-lg border border-border/30 bg-accent/20 p-6 transition-all duration-200 hover:border-border/60 hover:bg-accent/30"
            >
              <div className="space-y-3">
                {(paper.category || paper.meta) && (
                  <div className="flex flex-wrap gap-2 text-xs text-foreground/50">
                    {paper.category && (
                      <span className="rounded-full border border-border/40 px-3 py-1">{paper.category}</span>
                    )}
                    {paper.meta && <span className="px-1 py-1">{paper.meta}</span>}
                  </div>
                )}
                <h3 className="text-foreground">{paper.titleKo}</h3>
                {paper.titleEn && <p className="text-foreground/60 italic">{paper.titleEn}</p>}
                {paper.publication && <p className="text-sm text-foreground/55">{paper.publication}</p>}
                <p className="border-t border-border/30 pt-3 text-sm text-foreground/65">
                  {formatAuthors(paper.authors)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-md bg-accent/30 px-4 py-2 text-foreground/80 transition-colors duration-200 hover:bg-accent/50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              이전
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-md px-4 py-2 transition-colors duration-200 ${
                  currentPage === page
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent/30 text-foreground/80 hover:bg-accent/50 hover:text-foreground'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md bg-accent/30 px-4 py-2 text-foreground/80 transition-colors duration-200 hover:bg-accent/50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
