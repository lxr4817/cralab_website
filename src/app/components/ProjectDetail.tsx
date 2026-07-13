import { projects } from './Projects';

interface ProjectDetailProps {
  slug: string;
  onBack: () => void;
}

export default function ProjectDetail({ slug, onBack }: ProjectDetailProps) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 cursor-pointer text-sm font-medium text-foreground/55 transition-colors duration-200 hover:text-primary"
        >
          ← Projects
        </button>
        <h1>프로젝트를 찾을 수 없습니다</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 cursor-pointer text-sm font-medium text-foreground/55 transition-colors duration-200 hover:text-primary"
      >
        ← Projects
      </button>

      <article className="space-y-10">
        <header className="border-b border-border/30 pb-8">
          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-foreground/45">Project Detail</p>
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <h1 className="mb-4">{project.title}</h1>
              {project.subtitle && (
                <p className="text-xl leading-8 text-foreground/65">{project.subtitle}</p>
              )}
            </div>
            <div className="shrink-0 text-left md:text-right">
              <p className="font-medium text-foreground/80">{project.organization}</p>
              {project.period && <p className="mt-1 text-sm text-foreground/45">{project.period}</p>}
            </div>
          </div>
        </header>

        {project.video && (
          <section className="space-y-4">
            <h2 className="text-2xl text-foreground">Result</h2>
            <div className="overflow-hidden border border-border/35 bg-black">
              <video
                src={project.video}
                className="aspect-video w-full bg-black object-contain"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </section>
        )}

        <section className="grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)]">
          <h2 className="text-2xl text-foreground">Overview</h2>
          <p className="max-w-3xl leading-8 text-foreground/72">{project.description}</p>
        </section>
      </article>
    </div>
  );
}
