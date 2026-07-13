interface Project {
  title: string;
  subtitle?: string;
  organization: string;
  period?: string;
  description: string;
}

const projects: Project[] = [
  {
    title: 'VR기반 스마트돌봄스페이스 체험 솔루션 개발',
    organization: '국립재활원',
    period: '2024.07 ~ 2024.10 / 2025.09 ~ 2025.11',
    description:
      '국립재활원 내 1차 및 4차 스마트돌봄스페이스를 비수도권 사용자들도 경험할 수 있도록 디지털트윈 기반으로 공간을 구축하고, VR 콘텐츠로 제작해 편의성 및 접근성을 향상',
  },
  {
    title: '소원등',
    subtitle: '전통문화 기반 예술×기술 융합 프로젝트 공모전 전시',
    organization: '전주문화재단',
    period: '2025.10.01. ~ 2025.10.19.',
    description:
      '전통 풍등놀이를 디지털로 재해석한 체험형 미디어아트 작품. 화재와 환경 문제 없이 체험자가 소원을 담은 풍등을 가상 공간에 띄우고, 다른 참여자의 풍등과 함께 감상할 수 있는 안전하고 친환경적인 전통문화 콘텐츠로 구현',
  },
  {
    title: 'EmotionEdu Card',
    subtitle: '이모션 에듀 카드 교육용 카드앱 개발',
    organization: '순천향대학교',
    period: '2024.01 ~ 2024.12',
    description:
      '미국 및 한국의 교사, 상담자, 학교, 공공기관, 사설센터, 사회정서 교육에 관심이 많은 학부모들이 구독할 수 있는 상담 및 사회정서 교육용 카드앱 구현',
  },
  {
    title: "공공서비스디자인",
    subtitle: '퇴원 후 지속적 재활의료 이용을 위한 비대면 재활 서비스 디자인',
    organization: '국립재활원',
    period: '2024.07 ~ 2024.11',
    description:
      '실수요자와 관련 전문가들로 구성된 국민디자인단 회의체 운영, 국민디자인단의 의견을 반영한 개선방안 모색 및 프로세스 디자인',
  },
  {
    title: 'STORY LAB AX 2024',
    subtitle: '2024년 뉴미디어 신기술 콘텐츠랩 ICVFX 웹/모바일 드라마 기획 개발 랩',
    organization: '한국콘텐츠진흥원, VAXPORT',
    period: '2024.06 ~ 2024.11',
    description:
      '영화 [이벤트] IcVFX 레벨디자인 및 Unreal Engine 개발, 영화 [장례에 재수] IcVFX 감독, 미술 담당 조연출로 참여하여 ICVFX와 인공지능 통합 프로세스 영화 제작',
  },
];

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="space-y-10">
        <div className="border-b border-border/30 pb-8">
          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-foreground/45">Projects</p>
          <h1 className="mb-4">프로젝트</h1>
          <p className="max-w-3xl text-foreground/65">
            CRA Lab에서 수행한 연구, 서비스 디자인, 실감미디어 및 예술×기술 융합 프로젝트입니다.
          </p>
        </div>

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group border border-border/35 bg-background p-7 transition-colors duration-200 hover:border-foreground/25"
            >
              <div className="grid gap-6 lg:grid-cols-[92px_minmax(0,1fr)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-accent/30 text-lg font-semibold text-primary">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="min-w-0 space-y-5">
                  <div className="flex flex-col gap-4 border-b border-border/40 pb-5 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <h2 className="text-2xl text-primary">{project.title}</h2>
                      {project.subtitle && (
                        <p className="text-lg text-foreground/65">{project.subtitle}</p>
                      )}
                    </div>
                    <div className="shrink-0 text-left md:text-right">
                      <p className="text-sm font-medium text-foreground/80">{project.organization}</p>
                      {project.period && <p className="mt-1 text-sm text-foreground/45">{project.period}</p>}
                    </div>
                  </div>

                  <p className="leading-7 text-foreground/72">{project.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
