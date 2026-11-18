import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ConversationForm } from "@/components/contact/conversation-form";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { CONTACT } from "@/lib/page-texts/contact";

export default async function ContactPage() {
  const t = await getPageTexts(CONTACT);
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] pt-32 pb-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* The conversation */}
          <div className="lg:col-span-7">
            <Eyebrow dot className="mb-6">{t.eyebrow}</Eyebrow>
            <h1 className="text-display">{rich(t.title)}</h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-6 max-w-xl">{t.intro}</p>
            <div className="mt-14">
              <ConversationForm />
            </div>
          </div>

          {/* Direct lines and what happens next */}
          <aside className="lg:col-span-5 lg:pt-4">
            <div className="lg:sticky lg:top-28 space-y-10">
              <div>
                <p className="text-caption mb-4">{t.directLabel}</p>
                <ul className="contact-lines">
                  <li>
                    <Mail className="size-4" />
                    <a href="mailto:contact@krealabs.fr">contact@krealabs.fr</a>
                  </li>
                  <li>
                    <Phone className="size-4" />
                    <a href="tel:+33781758188">07 81 75 81 88</a>
                    <span>lun–ven, 9h–18h</span>
                  </li>
                  <li>
                    <MapPin className="size-4" />
                    <a href="https://www.google.com/search?kgmid=/g/11vxv18qcr" target="_blank" rel="noopener noreferrer">
                      Rouen, Normandie
                    </a>
                    <span>France entière</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-caption mb-4">{t.nextLabel}</p>
                <ol className="contact-next">
                  {t.next.map((n, i) => (
                    <li key={n.title}>
                      <span>{i + 1}</span>
                      <div>
                        <p className="text-body-sm font-medium">{n.title}</p>
                        <p className="text-body-sm text-[var(--muted-foreground)] mt-1">{n.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <ul className="flex flex-wrap gap-2">
                {t.promises.map((p) => (
                  <li key={p.label} className="contact-pill">{p.label}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
