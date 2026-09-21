"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { CHROME_BRAND_TAGLINE } from "@/config/contact";
import { NAV_GROUPS, NAV_PRIMARY_CTA, type NavGroup, type NavLink } from "@/config/nav";

const CLOSE_DELAY_MS = 140;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`ml-0.5 h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform duration-150 ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DesktopDropdown({
  group,
  open,
  onOpen,
  onClose,
  onCloseImmediate,
}: {
  group: NavGroup;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onCloseImmediate: () => void;
}) {
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(onClose, CLOSE_DELAY_MS);
  };

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseImmediate();
        buttonRef.current?.focus();
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }
      onCloseImmediate();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, onCloseImmediate]);

  const focusItem = (index: number) => {
    const items = menuRef.current?.querySelectorAll<HTMLAnchorElement>("[data-nav-item]");
    items?.[index]?.focus();
  };

  const onMenuKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const items = menuRef.current?.querySelectorAll<HTMLAnchorElement>("[data-nav-item]");
    if (!items?.length) return;
    const current = Array.from(items).indexOf(document.activeElement as HTMLAnchorElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem(current < 0 ? 0 : (current + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem(current <= 0 ? items.length - 1 : current - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusItem(items.length - 1);
    } else if (e.key === "Tab") {
      onCloseImmediate();
    }
  };

  const onButtonKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
      requestAnimationFrame(() => focusItem(0));
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer();
        onOpen();
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`inline-flex items-center whitespace-nowrap rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
          open
            ? "bg-secondary text-primary"
            : "text-slate-700 hover:bg-secondary hover:text-primary"
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => {
          if (open) onCloseImmediate();
          else onOpen();
        }}
        onKeyDown={onButtonKeyDown}
        onFocus={onOpen}
      >
        {group.label}
        <Chevron open={open} />
      </button>

      {open ? (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={group.label}
          className="absolute left-0 top-full z-50 mt-1 min-w-[14.5rem] rounded-lg border border-border bg-card py-1.5 shadow-elevated"
          onKeyDown={onMenuKeyDown}
          onMouseEnter={clearCloseTimer}
        >
          {group.items.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              role="menuitem"
              data-nav-item
              className="block px-3.5 py-2 text-[13px] font-medium text-slate-700 transition-colors hover:bg-secondary hover:text-primary focus:bg-secondary focus:text-primary focus:outline-none"
              onClick={onCloseImmediate}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MobileAccordionSection({
  group,
  open,
  onToggle,
  onNavigate,
}: {
  group: NavGroup;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = useId();

  return (
    <div className="border-b border-border-subtle last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-sm font-semibold text-primary"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{group.label}</span>
        <Chevron open={open} />
      </button>
      {open ? (
        <div id={panelId} className="space-y-0.5 pb-2">
          {group.items.map((item: NavLink) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="block rounded-md px-3 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function Header({
  forceHidePhone: _forceHidePhone = false,
}: {
  forceHidePhone?: boolean;
} = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopId, setOpenDesktopId] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>("get-help");
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  const closeDesktop = useCallback(() => setOpenDesktopId(null), []);
  const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobile();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen, closeMobile]);

  // Close desktop menus on route-style focus away via Escape already handled per-menu.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const first = mobilePanelRef.current?.querySelector<HTMLElement>("button, a");
    first?.focus();
  }, [mobileMenuOpen]);

  return (
    <header className="relative z-50 border-b border-border bg-card shadow-card">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between gap-4 py-2.5 lg:py-3">
          <Link
            href="/"
            className="group block min-w-0"
            aria-label="Police Station Agent home page"
          >
            <div className="font-display text-base font-bold leading-tight text-primary transition-colors group-hover:text-primary-light sm:text-lg">
              Police Station Agent
            </div>
            <div className="mt-0.5 text-[10px] font-semibold leading-tight text-slate-600 sm:text-[11px]">
              {CHROME_BRAND_TAGLINE}
            </div>
          </Link>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_GROUPS.map((group) => (
              <DesktopDropdown
                key={group.id}
                group={group}
                open={openDesktopId === group.id}
                onOpen={() => setOpenDesktopId(group.id)}
                onClose={() =>
                  setOpenDesktopId((current) => (current === group.id ? null : current))
                }
                onCloseImmediate={closeDesktop}
              />
            ))}
            <Link
              href={NAV_PRIMARY_CTA.href}
              className="btn-gold ml-2 !min-h-9 !px-3.5 !text-sm"
            >
              {NAV_PRIMARY_CTA.label}
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={NAV_PRIMARY_CTA.href}
              className="btn-gold hidden !min-h-9 !px-3 !text-sm sm:inline-flex"
            >
              {NAV_PRIMARY_CTA.label}
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-md transition-colors hover:bg-primary-light"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-panel"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div
          id="mobile-nav-panel"
          ref={mobilePanelRef}
          className="border-t border-border bg-card shadow-elevated lg:hidden"
        >
          <nav
            className="mx-auto max-w-7xl px-3 py-2"
            aria-label="Mobile navigation"
          >
            {NAV_GROUPS.map((group) => (
              <MobileAccordionSection
                key={group.id}
                group={group}
                open={openMobileSection === group.id}
                onToggle={() =>
                  setOpenMobileSection((current) =>
                    current === group.id ? null : group.id
                  )
                }
                onNavigate={closeMobile}
              />
            ))}
            <Link
              href={NAV_PRIMARY_CTA.href}
              className="btn-gold mx-3 my-3 w-[calc(100%-1.5rem)]"
              onClick={closeMobile}
            >
              {NAV_PRIMARY_CTA.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
