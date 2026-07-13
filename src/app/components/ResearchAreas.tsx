export default function ResearchAreas() {
  const keywords = [
    'Media Therapy',
    'UI/UX',
    '가상현실(VR)',
    '증강현실(AR)',
    '혼합현실(MR)',
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-foreground/45">Research Area</p>
          <h1 className="mb-4">연구 분야</h1>
          <h2 className="mb-6 max-w-3xl text-3xl leading-snug text-foreground md:text-4xl">
            Converged Reality and Arts Lab
          </h2>
          <div className="space-y-4 text-foreground/80">
            <p>
              CRA Lab은 가상현실(VR), 증강현실(AR), 혼합현실(MR) 기반의 콘텐츠 기획, 제작, 개발을 주로 합니다.
            </p>
            <p>
              저희 연구실은 창의적이고 실용성있는 연구를 통해 UI/UX, 교육, 전시 등을 연구 분야로 현실 세계에서의 문제 해결과 효율적인 서비스 제공을 목표로 하고 있습니다.
            </p>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-foreground/60">Keyword</h3>
          <div className="flex flex-wrap gap-3">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-4 py-2 bg-accent/30 border border-border/30 rounded-full text-sm text-foreground/70 hover:bg-accent/50 hover:border-border/50 transition-colors duration-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
