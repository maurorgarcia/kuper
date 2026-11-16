import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import { waLink } from "@/lib/site";

/** Variantes y medidas exactas del Handoff §2.7. */
const VARIANTS = {
  primary: { cls: "h-[54px] px-7 text-base bg-teal-700 text-white hover:bg-teal-800 hover:text-white active:scale-[.98]", icon: 19 },
  "primary-sm": { cls: "h-[46px] px-[22px] text-[15px] bg-teal-700 text-white hover:bg-teal-800 hover:text-white active:scale-[.98]", icon: 18 },
  secondary: { cls: "h-[54px] px-[26px] text-base border border-line-300 text-ink-900 hover:bg-mint-100 hover:border-teal-300 hover:text-ink-900", icon: 16 },
  outline: { cls: "h-[50px] px-6 text-[15px] border border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white", icon: 16 },
  inverse: { cls: "h-14 px-[30px] text-base bg-white text-teal-800 hover:bg-mint-100 hover:text-teal-900 active:scale-[.98]", icon: 19 },
} as const;

export type ButtonVariant = keyof typeof VARIANTS;

type Props = {
  href: string;
  variant?: ButtonVariant;
  icon?: IconName;
  iconPosition?: "start" | "end";
  external?: boolean;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
};

export function Button({ href, variant = "primary", icon, iconPosition = "start", external, ariaLabel, className = "", children }: Props) {
  const v = VARIANTS[variant];
  const ext = external ? { target: "_blank", rel: "noopener" } : {};
  const ico = icon ? <Icon name={icon} size={v.icon} /> : null;
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...ext}
      className={`inline-flex items-center gap-2.5 rounded-full font-medium no-underline whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 ease-kuper ${v.cls} ${className}`}
    >
      {iconPosition === "start" && ico}
      {children}
      {iconPosition === "end" && ico}
    </a>
  );
}

/** Botón que abre WhatsApp con mensaje (por defecto, el general del sitio). */
export function WhatsAppButton({
  message,
  icon = "whatsapp",
  ...rest
}: Omit<Props, "href" | "external"> & { message?: string }) {
  return <Button href={waLink(message)} external icon={icon} {...rest} />;
}
