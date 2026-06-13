"use client";

interface Props {
  isOpen?: boolean;
  onClick: () => void;
}

export default function NavbarMobileMenu({
  isOpen = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 lg:hidden ${
        isOpen
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted"
      }`}
    >
      <span className="relative block h-4 w-5">
        <span
          className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out ${
            isOpen ? "top-[7px] rotate-45" : "top-0"
          }`}
        />
        <span
          className={`absolute top-[7px] left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ease-out ${
            isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
          }`}
        />
        <span
          className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out ${
            isOpen ? "top-[7px] -rotate-45" : "top-[14px]"
          }`}
        />
      </span>
    </button>
  );
}
