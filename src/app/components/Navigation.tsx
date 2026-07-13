import { useState } from 'react';
import logo from '../../imports/cra-logo.png';

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href?: string;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'HOME',
    href: 'home',
  },
  {
    label: 'Research',
    subItems: [
      { label: '연구 분야', href: 'research-areas' },
      { label: '논문', href: 'publications' },
    ],
  },
  {
    label: 'Members',
    subItems: [
      { label: '지도교수', href: 'advisor' },
      { label: '구성원', href: 'current-members' },
    ],
  },
  {
    label: 'Projects',
    href: 'projects',
  },
];

interface NavigationProps {
  onNavigate: (page: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="relative z-[100] border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12 2xl:px-16">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex-shrink-0 cursor-pointer rounded focus:outline-none"
            >
              <img src={logo} alt="Lab Logo" className="h-8 md:h-11" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => item.subItems && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.subItems ? (
                    <button className="cursor-pointer px-3 py-2 text-base text-foreground/80 hover:text-foreground transition-colors duration-200">
                      {item.label}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onNavigate(item.href!);
                        setActiveDropdown(null);
                      }}
                      className="cursor-pointer px-3 py-2 text-base text-foreground/80 hover:text-foreground transition-colors duration-200"
                    >
                      {item.label}
                    </button>
                  )}

                  {item.subItems && activeDropdown === item.label && (
                    <div className="absolute left-0 top-full z-[110] w-52 pt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="rounded-md bg-popover/95 backdrop-blur-sm shadow-lg ring-1 ring-border/50 py-2">
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.label}
                            onClick={() => {
                              onNavigate(subItem.href);
                              setActiveDropdown(null);
                            }}
                            className="w-full cursor-pointer text-left block px-5 py-2.5 text-sm text-foreground/70 hover:bg-accent/50 hover:text-foreground transition-colors duration-150"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex cursor-pointer items-center justify-center p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-colors duration-200"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">메뉴 열기</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <div key={item.label}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className="w-full cursor-pointer text-left px-3 py-2 text-base text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors duration-200"
                    >
                      <span className="flex items-center justify-between">
                        {item.label}
                        <svg
                          className={`h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.label ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    {activeDropdown === item.label && (
                      <div className="ml-4 space-y-1">
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.label}
                            onClick={() => {
                              onNavigate(subItem.href);
                              setMobileMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                            className="w-full cursor-pointer text-left block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-accent/30 rounded-md transition-colors duration-150"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => {
                      onNavigate(item.href!);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full cursor-pointer text-left block px-3 py-2 text-base text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
