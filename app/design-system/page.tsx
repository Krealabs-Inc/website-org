import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { ArrowRight, Sparkles, Code, Layers } from "lucide-react"

export const metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
}

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-24 pb-32">
      <Container>
        {/* HEADER */}
        <header className="mb-24 border-b border-[var(--border)] pb-12">
          <Eyebrow number="00" dot className="mb-6">
            Design System v2
          </Eyebrow>
          <h1 className="text-display max-w-4xl">
            Le langage <em>visuel</em> de Krealabs.
          </h1>
          <p className="text-body-lg text-[var(--muted-foreground)] mt-6 max-w-2xl">
            Un système cohérent, restreint, intentionnel. Une seule échelle de
            radius. Une seule couleur d'accent. Trois fontes au caractère
            distinct.
          </p>
        </header>

        {/* TYPOGRAPHY */}
        <section className="mb-24">
          <Eyebrow number="01" className="mb-4">Typographie</Eyebrow>
          <h2 className="text-h2 mb-12">Hiérarchie</h2>

          <div className="space-y-10 border border-[var(--border)] rounded-[var(--radius)] p-8 bg-[var(--surface)]">
            <Row label="Display">
              <p className="text-display">
                Sites web <em>signés</em> Rouen.
              </p>
            </Row>
            <Row label="H1">
              <p className="text-h1">Développement <em>sur mesure</em></p>
            </Row>
            <Row label="H2">
              <p className="text-h2">Notre approche</p>
            </Row>
            <Row label="H3">
              <p className="text-h3">Audit technique gratuit</p>
            </Row>
            <Row label="Body Large">
              <p className="text-body-lg max-w-xl">
                Nous construisons des applications web modernes pour les
                entreprises normandes qui veulent une présence digitale
                exigeante.
              </p>
            </Row>
            <Row label="Body">
              <p className="text-body max-w-xl">
                Site vitrine, application sur mesure, refonte de logiciel
                métier : nous intervenons sur l'ensemble du cycle.
              </p>
            </Row>
            <Row label="Eyebrow">
              <Eyebrow number="03" dot>Services proposés</Eyebrow>
            </Row>
            <Row label="Caption">
              <span className="text-caption">RC ROUEN 2024 · SIRET 000 000 000 00000</span>
            </Row>
          </div>
        </section>

        {/* COLORS */}
        <section className="mb-24">
          <Eyebrow number="02" className="mb-4">Couleurs</Eyebrow>
          <h2 className="text-h2 mb-12">Palette</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Swatch label="Background" value="#0A0A0A" var="--background" />
            <Swatch label="Surface" value="#141414" var="--surface" />
            <Swatch label="Surface Hover" value="#1C1C1C" var="--surface-hover" />
            <Swatch label="Border" value="rgba(255,255,255,0.08)" var="--border" />
            <Swatch label="Foreground" value="#FAFAFA" var="--foreground" />
            <Swatch label="Muted FG" value="60%" var="--muted-foreground" />
            <Swatch label="Subtle FG" value="40%" var="--subtle-foreground" />
            <Swatch label="Accent" value="#B06CFF" var="--accent" />
          </div>
        </section>

        {/* BUTTONS */}
        <section className="mb-24">
          <Eyebrow number="03" className="mb-4">Composants</Eyebrow>
          <h2 className="text-h2 mb-12">Buttons</h2>

          <div className="space-y-12">
            <div>
              <p className="text-eyebrow mb-4">Variantes — taille md (default, 40px)</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link button</Button>
              </div>
            </div>

            <div>
              <p className="text-eyebrow mb-4">Variantes — taille lg (48px)</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg">Démarrer un projet <ArrowRight /></Button>
                <Button size="lg" variant="secondary">Nos services</Button>
                <Button size="lg" variant="outline">En savoir plus</Button>
              </div>
            </div>

            <div>
              <p className="text-eyebrow mb-4">Icon-only</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="icon"><Sparkles /></Button>
                <Button size="icon" variant="secondary"><Code /></Button>
                <Button size="icon" variant="ghost"><Layers /></Button>
              </div>
            </div>

            <div>
              <p className="text-eyebrow mb-4">États</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* CARDS */}
        <section className="mb-24">
          <h2 className="text-h2 mb-12">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Site vitrine</CardTitle>
                <CardDescription>
                  Site moderne, performant, optimisé SEO.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-[var(--muted-foreground)]">
                  Idéal pour les PME normandes qui veulent une vitrine
                  professionnelle pensée pour Google.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Application sur mesure</CardTitle>
                <CardDescription>
                  Logiciel métier ou app web.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-[var(--muted-foreground)]">
                  Outil interne, plateforme client, SaaS : on conçoit et on
                  développe.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Refonte SEO</CardTitle>
                <CardDescription>
                  Performance, Core Web Vitals, contenus.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-[var(--muted-foreground)]">
                  Audit complet et plan d'action concret pour remonter dans les
                  résultats Google.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FORM ELEMENTS */}
        <section className="mb-24">
          <h2 className="text-h2 mb-12">Form Elements</h2>
          <div className="max-w-xl space-y-6 border border-[var(--border)] rounded-[var(--radius)] p-8 bg-[var(--surface)]">
            <div className="space-y-2">
              <label className="text-eyebrow" htmlFor="ds-name">Nom complet</label>
              <Input id="ds-name" placeholder="Jean Dupont" />
            </div>
            <div className="space-y-2">
              <label className="text-eyebrow" htmlFor="ds-email">Email</label>
              <Input id="ds-email" type="email" placeholder="jean@entreprise.fr" />
            </div>
            <div className="space-y-2">
              <label className="text-eyebrow" htmlFor="ds-message">Message</label>
              <Textarea id="ds-message" placeholder="Parlez-nous de votre projet..." />
            </div>
            <Button size="lg" className="w-full">
              Envoyer la demande <ArrowRight />
            </Button>
          </div>
        </section>

        {/* BADGES */}
        <section className="mb-24">
          <h2 className="text-h2 mb-12">Badges</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge>
              <span className="size-1.5 rounded-full bg-[var(--accent)]" />
              Disponible
            </Badge>
          </div>
        </section>

        {/* PATTERNS */}
        <section className="mb-24">
          <h2 className="text-h2 mb-12">Patterns décoratifs</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="aspect-video rounded-[var(--radius)] border border-[var(--border)] bg-grid bg-grid-fade" />
            <div className="aspect-video rounded-[var(--radius)] border border-[var(--border)] bg-dot" />
          </div>
        </section>
      </Container>
    </main>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] gap-6 items-baseline">
      <span className="text-eyebrow pt-2">{label}</span>
      <div>{children}</div>
    </div>
  )
}

function Swatch({ label, value, var: varName }: { label: string; value: string; var: string }) {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] overflow-hidden">
      <div className="h-24" style={{ background: `var(${varName})` }} />
      <div className="p-3 border-t border-[var(--border)]">
        <p className="text-body-sm font-medium">{label}</p>
        <p className="text-caption mt-1">{value}</p>
      </div>
    </div>
  )
}
