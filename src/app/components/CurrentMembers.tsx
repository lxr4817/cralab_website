import { useEffect } from 'react';
import kimMinHunImage from '../../imports/members/optimized/mhk.jpg';
import leeSeungHyunImage from '../../imports/members/optimized/shl.jpg';
import ohYuRimImage from '../../imports/members/optimized/yro.jpg';
import yoonHaeJuImage from '../../imports/members/optimized/hjy.jpg';
import kimMiSoImage from '../../imports/members/optimized/msk.jpg';
import kimYeRinImage from '../../imports/members/optimized/yrk.jpg';
import kimYeonWooImage from '../../imports/members/optimized/ywk.jpg';
import seoJeongYunImage from '../../imports/members/optimized/jys.jpg';
import baeSeoYeonImage from '../../imports/members/optimized/bae-seo-yeon.jpg';
import yuDaheeImage from '../../imports/members/optimized/yu-dahee.jpg';
import jungYunseoImage from '../../imports/members/optimized/jung-yunseo.jpg';
import choiSolImage from '../../imports/members/optimized/choi-sol.jpg';

type MemberCourse =
  | 'Ph.D. Students'
  | 'Master’s Students'
  | 'Undergraduate Research Assistants'
  | 'Master’s Alumni'
  | 'Undergraduate Alumni';

interface MemberInfo {
  email?: string;
}

interface Member {
  name: string;
  nameEn: string;
  course: MemberCourse;
  image?: string;
  info?: MemberInfo;
}

const members: Member[] = [
  {
    name: '김민훈',
    nameEn: 'Minhun Kim',
    course: 'Ph.D. Students',
    image: kimMinHunImage,
    info: {
      email: 'yja02113@naver.com',
    },
  },
  {
    name: '이승현',
    nameEn: 'Seunghyun Lee',
    course: 'Master’s Alumni',
    image: leeSeungHyunImage,
    info: {
      email: 'ssseunghyunlee@gmail.com',
    },
  },
  {
    name: '오유림',
    nameEn: 'Yurim Oh',
    course: 'Master’s Alumni',
    image: ohYuRimImage,
    info: {
      email: 'yurimblossom@duksung.ac.kr',
    },
  },
  {
    name: '윤해주',
    nameEn: 'Haeju Yoon',
    course: 'Master’s Alumni',
    image: yoonHaeJuImage,
    info: {
      email: 'gngn6751@duksung.ac.kr',
    },
  },
  {
    name: '김미소',
    nameEn: 'Miso Kim',
    course: 'Master’s Students',
    image: kimMiSoImage,
    info: {
      email: '20210299@duksung.ac.kr',
    },
  },
  {
    name: '김예린',
    nameEn: 'Yerin Kim',
    course: 'Master’s Students',
    image: kimYeRinImage,
    info: {
      email: 'yrkim6228@duksung.ac.kr',
    },
  },
  {
    name: 'Chu Minh Tam',
    nameEn: 'Chu Minh Tam',
    course: 'Master’s Students',
    info: {
      email: 'chutim1998@gmail.com',
    },
  },
  {
    name: '김연우',
    nameEn: 'Yeonwoo Kim',
    course: 'Master’s Students',
    image: kimYeonWooImage,
    info: {
      email: 'yeosnn@naver.com',
    },
  },
  {
    name: '서정윤',
    nameEn: 'Jeongyun Seo',
    course: 'Undergraduate Alumni',
    image: seoJeongYunImage,
    info: {
      email: 'bellita@naver.com',
    },
  },
  {
    name: '배서연',
    nameEn: 'Seoyeon Bae',
    course: 'Undergraduate Research Assistants',
    image: baeSeoYeonImage,
    info: {
      email: 'dexrchive@duksung.ac.kr',
    },
  },
  {
    name: '유다희',
    nameEn: 'Yu Dahee',
    course: 'Undergraduate Research Assistants',
    image: yuDaheeImage,
    info: {
      email: '20241193@duksung.ac.kr',
    },
  },
  {
    name: '정윤서',
    nameEn: 'Jung Yunseo',
    course: 'Undergraduate Research Assistants',
    image: jungYunseoImage,
    info: {
      email: 'binseo22@duksung.ac.kr',
    },
  },
  {
    name: '최솔',
    nameEn: 'Choi Sol',
    course: 'Undergraduate Research Assistants',
    image: choiSolImage,
    info: {
      email: 'sooolki@duksung.ac.kr',
    },
  },
];

const courses: MemberCourse[] = [
  'Ph.D. Students',
  'Master’s Students',
  'Undergraduate Research Assistants',
  'Master’s Alumni',
  'Undergraduate Alumni',
];

const courseSlugs: Record<MemberCourse, string> = {
  'Ph.D. Students': 'phd-students',
  'Master’s Students': 'masters-students',
  'Undergraduate Research Assistants': 'undergraduate-research-assistants',
  'Master’s Alumni': 'masters-alumni',
  'Undergraduate Alumni': 'undergraduate-alumni',
};

const infoRows: Array<{ key: keyof MemberInfo; label: string }> = [
  { key: 'email', label: '이메일' },
];

function initials(name: string) {
  if (/^[A-Za-z]/.test(name)) {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  return name.slice(0, 1);
}

function MemberDetails({ info }: { info?: MemberInfo }) {
  if (!info) {
    return <p className="text-sm text-foreground/45">상세 정보 업데이트 예정</p>;
  }

  return (
    <dl className="grid gap-x-5 gap-y-2 text-sm sm:grid-cols-2">
      {infoRows.map(({ key, label }) => {
        const value = info[key];

        if (!value) {
          return null;
        }

        return (
          <div key={key} className={key === 'email' ? 'sm:col-span-2' : undefined}>
            <dt className="mb-0.5 text-xs text-foreground/42">{label}</dt>
            <dd className="break-all text-foreground/72">{value}</dd>
          </div>
        );
      })}
    </dl>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <article className="relative min-h-[300px] border border-border/40 bg-background px-7 py-8 transition-colors duration-200 hover:border-foreground/25">
      <div className="grid h-full grid-cols-[minmax(0,1fr)_168px] gap-8">
        <div className="flex min-w-0 flex-col">
          <p className="mb-3 text-sm text-foreground">{member.course}</p>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-primary">{member.name}</h2>
            <p className="text-sm text-foreground/45">{member.nameEn}</p>
          </div>

          <div className="my-6 h-px w-full bg-border/60" />
          <MemberDetails info={member.info} />
        </div>

        <div className="self-start">
          {member.image ? (
            <img
              src={member.image}
              alt={`${member.name} profile`}
              className="h-[202px] w-[168px] object-cover object-top [image-rendering:auto]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-[202px] w-[168px] items-center justify-center bg-accent/25 text-3xl font-semibold text-foreground/35">
              {initials(member.name)}
            </div>
          )}
        </div>
      </div>

    </article>
  );
}

export default function CurrentMembers() {
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace('#', ''));
    const target = Object.values(courseSlugs).includes(hash) ? document.getElementById(hash) : null;

    if (target) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="space-y-10">
        <div className="flex flex-wrap gap-x-9 gap-y-3 border-b border-border/30 pb-8">
          {courses.map((course) => (
            <a
              key={course}
              href={`#${courseSlugs[course]}`}
              className="text-lg font-medium text-foreground transition-colors duration-200 hover:text-primary"
            >
              {course}
            </a>
          ))}
        </div>

        <div className="space-y-12">
          {courses.map((course) => {
            const courseMembers = members.filter((member) => member.course === course);

            return (
              <section
                key={course}
                id={courseSlugs[course]}
                className="space-y-5"
              >
                <div className="flex items-center justify-between border-b border-border/20 pb-3">
                  <h1 className="text-2xl">{course}</h1>
                  <span className="text-sm text-foreground/45">{courseMembers.length} members</span>
                </div>

                <div className="grid gap-10 lg:grid-cols-2">
                  {courseMembers.map((member) => (
                    <MemberCard key={member.name} member={member} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
