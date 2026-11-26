import { Check, Copy, Mail } from "lucide-react";
import { useEffect, useState } from "react";

import { ButtonLink } from "~/components/atoms/ButtonLink";
import { ExternalLink } from "~/components/atoms/ExternalLink";
import { Section } from "~/components/layout/Section";
import { profile } from "~/content/profile";
import { useEmailAddress } from "~/hooks/useEmailAddress";

const COPIED_RESET_MS = 2000;

export function Contact() {
  const email = useEmailAddress(profile.emailUser, profile.emailDomain);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, COPIED_RESET_MS);
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  const copyEmail = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard blocked: the mailto button still works.
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something people enjoy using">
      <div className="max-w-2xl">
        <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
          Whether it's a product idea, a tricky frontend problem or a mock interview, my inbox is
          open.
        </p>

        {profile.availability && (
          <div className="tile mt-8 p-5 sm:p-6">
            <h3 className="font-mono text-xs tracking-widest text-accent uppercase">
              The role I&apos;m looking for
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
              {profile.availability.lookingFor}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={email ? `mailto:${email}` : "#contact"} aria-disabled={!email}>
            <Mail className="size-4" aria-hidden="true" />
            Email me
          </ButtonLink>
          <button
            type="button"
            onClick={() => void copyEmail()}
            disabled={!email}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-raised hover:text-text-primary disabled:opacity-60"
          >
            {copied ? (
              <Check className="size-4 text-accent" aria-hidden="true" />
            ) : (
              <Copy className="size-4" aria-hidden="true" />
            )}
            {copied ? "Copied!" : "Copy email address"}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>

        {/* Rows sit close together; each link keeps a 2.25rem-tall tap target (WCAG 2.5.8 asks for 1.5rem). */}
        <ul className="mt-10 flex flex-wrap gap-x-6">
          {profile.links.map((link) => (
            <li key={link.href}>
              <ExternalLink
                href={link.href}
                className="min-h-9 text-sm font-medium text-text-secondary hover:text-accent"
              >
                {link.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
