import professorImage from '../../imports/image.png';

export default function Advisor() {
  const publications = [
    { title: 'A Real-time Data-driven Multimedia Platform Integrating Public Data and AI-based Facial Generation for Personalized Interaction', year: 2025, journal: 'Journal of Mobile Multimedia' },
    { title: "The impact of negative emotions on adolescents' nonsuicidal self-injury thoughts: an integrated application of machine learning and multilevel logistic models", year: 2025, journal: 'PLoS One' },
    { title: 'A Study on Exploiting Temporal Patterns in Semester Records for Efficient Student Dropout Prediction', year: 2025, journal: 'Electronics' },
    { title: 'VGA 분석을 통한 몰입형 VR 전시공간의 공간 구성 연구', year: 2025, journal: '전시디자인연구' },
    { title: 'Kinect 기반 인터랙티브 아트를 통한 인간 역동성의 시각화', year: 2025, journal: '전시디자인연구' },
    { title: '공연예술에 사용된 애니메트로닉스 로봇의 활용 사례 분석', year: 2025, journal: '전시디자인연구' },
    { title: '브랜드 정체성 강화를 위한 스페이스 브랜딩에서의 미디어아트 활용 연구', year: 2025, journal: '디지털콘텐츠학회논문지' },
    { title: '비자살적 자해 행동 예측을 위한 스마트워치 연동 애플리케이션', year: 2024, journal: '한국영상학회논문집' },
    { title: '예술치료의 매체로써 VR/AR/MR 콘텐츠 사례분석 및 제언', year: 2023, journal: '한국예술치료학회지' },
    { title: 'Designing Digital Therapeutic Content Using Chronic Disease Data: A Focus on Improving Urinary Dysfunction', year: 2023, journal: 'International Neurourology Journal' },
    { title: '메타버스 내 공공도서관 사용성 분석', year: 2023, journal: '한국비블리아학회지' },
    { title: '광학문자인식(OCR)을 통한 데이터 분석 기반의 채식주의 유형 정보 제공 및 추천 애플리케이션 개발', year: 2022, journal: '한국영상학회논문집' },
    { title: '딥러닝 기반 수어 교육 온라인 플랫폼 구현', year: 2022, journal: '디지털콘텐츠학회논문지' },
    { title: "VR Human Body Treatment Game 'BodyCureBot' using Hand Tracking", year: 2022, journal: 'Communications in Computer and Information Science' },
    { title: '핸드 트래킹을 활용한 비접촉식 인터페이스 기반 VR 콘텐츠 개발- 인체치료게임', year: 2022, journal: '한국영상학회논문집' },
    { title: '360도 VR 실사영상 콘텐츠 제작방법 수업 연구', year: 2022, journal: '학습자중심교과교육연구' },
    { title: "Development of 'School Nocturnble':A Sensitive Game with Eye Trackers", year: 2021, journal: 'HCI International 2021' },
    { title: '포토리얼리스틱 렌더링에 대한 실기수업에서의 이론적 고찰', year: 2021, journal: '학습자중심교과교육연구' },
    { title: '홈트레이닝 모바일 애플리케이션에 대한 연구-과업 분석과 인터페이스 디자인을 중심으로-', year: 2020, journal: '일러스트레이션 포럼' },
    { title: "Professional School Counselors' Engagement in Social Justice Activity in the United States", year: 2020, journal: '학습자중심교과교육연구' },
    { title: '홈트레이닝 모바일 애플리케이션에 대한 연구', year: 2019, journal: '일러스트레이션 포럼' },
  ];

  const exhibitions = [
    { title: 'The Boundaries', year: 2024, venue: '湘南(샹난-Xiang.Nan)대학미술관' },
    { title: 'Universe', year: 2020, venue: '한전아트갤러리' },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <img
              src={professorImage}
              alt="나정조 교수"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-foreground/60 mb-1">덕성여자대학교</p>
              <h1 className="mb-4">나정조 교수</h1>
            </div>
            <div className="space-y-2 text-foreground/80">
              <p>
                <span className="inline-block w-24">E-mail:</span>
                <a href="mailto:jungjona@duksung.ac.kr" className="hover:text-foreground transition-colors">
                  jungjona@duksung.ac.kr
                </a>
              </p>
              <p>
                <span className="inline-block w-24">Address:</span>
                <span>덕성여자대학교 차미리사관 341호</span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-6 pb-3 border-b border-border/30">연구 실적</h2>
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <div key={index} className="pl-4 border-l-2 border-border/20 hover:border-foreground/30 transition-colors duration-200">
                <p className="text-foreground/80 leading-relaxed">
                  {pub.title},<span className="mx-2 text-foreground/60">{pub.year}</span>
                  <span className="italic text-foreground/60">{pub.journal}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-6 pb-3 border-b border-border/30">전시 실적</h2>
          <div className="space-y-4">
            {exhibitions.map((exh, index) => (
              <div key={index} className="pl-4 border-l-2 border-border/20 hover:border-foreground/30 transition-colors duration-200">
                <p className="text-foreground/80 leading-relaxed">
                  {exh.title},<span className="mx-2 text-foreground/60">{exh.year}</span>
                  <span className="italic text-foreground/60">{exh.venue}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
