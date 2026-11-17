import { PlayInView } from "@/components/tech/play-in-view";

/* Each technology page has its own looping illustration. Pure CSS loops
   (globals.css, "tech demos"), paused off screen and shown still with
   reduced motion. */

/** Next.js: the page arrives piece by piece, rendered on the server. */
export function NextDemo() {
  return (
    <PlayInView className="demo-next">
      <div className="demo-window">
        <div className="demo-bar">
          <i />
          <i />
          <i />
          <span>votre-site.fr</span>
        </div>
        <div className="demo-next-page">
          <span className="dn dn-nav" />
          <span className="dn dn-hero" />
          <span className="dn dn-line" />
          <span className="dn dn-cards">
            <span />
            <span />
            <span />
          </span>
        </div>
      </div>
      <p className="demo-caption">Rendu côté serveur : la page arrive par morceaux, déjà lisible par Google.</p>
    </PlayInView>
  );
}

/** React: a change lights only the components it concerns. */
export function ReactDemo() {
  const nodes = [
    { id: "app", x: 200, y: 30, label: "App" },
    { id: "header", x: 90, y: 120, label: "Header" },
    { id: "page", x: 310, y: 120, label: "Page" },
    { id: "cart", x: 40, y: 210, label: "Panier" },
    { id: "menu", x: 140, y: 210, label: "Menu" },
    { id: "card1", x: 250, y: 210, label: "Carte" },
    { id: "card2", x: 370, y: 210, label: "Carte" },
  ];
  const edges = [
    ["app", "header"],
    ["app", "page"],
    ["header", "cart"],
    ["header", "menu"],
    ["page", "card1"],
    ["page", "card2"],
  ];
  const at = (id: string) => nodes.find((n) => n.id === id)!;
  const lit = new Set(["app", "header", "cart"]);
  return (
    <PlayInView className="demo-react">
      <svg viewBox="0 0 420 250" role="img" aria-label="Arbre de composants : seul le panier se met à jour">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={at(a).x}
            y1={at(a).y}
            x2={at(b).x}
            y2={at(b).y}
            className={lit.has(a) && lit.has(b) ? "dr-edge is-lit" : "dr-edge"}
          />
        ))}
        {nodes.map((n) => (
          <g key={n.id} className={lit.has(n.id) ? "dr-node is-lit" : "dr-node"} transform={`translate(${n.x} ${n.y})`}>
            <rect x="-38" y="-16" width="76" height="32" rx="10" />
            <text textAnchor="middle" dy="5">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="demo-caption">Un article ajouté au panier : seul le panier se redessine, le reste ne bouge pas.</p>
    </PlayInView>
  );
}

/** TypeScript: a typo caught before it ships, then fixed. */
export function TypeScriptDemo() {
  return (
    <PlayInView className="demo-ts">
      <div className="demo-window">
        <div className="demo-bar">
          <i />
          <i />
          <i />
          <span>commande.ts</span>
        </div>
        <pre className="demo-code">
          <span className="c-k">type</span> Client = {"{"} nom: <span className="c-t">string</span>; email: <span className="c-t">string</span> {"}"}
          {"\n\n"}
          <span className="c-k">function</span> <span className="c-f">confirmer</span>(client: Client) {"{"}
          {"\n"}
          {"  "}envoyer(client.<span className="dt-typo"><span className="dt-bad">emial</span><span className="dt-good">email</span></span>);
          {"\n"}
          {"}"}
        </pre>
        <div className="dt-status">
          <span className="dt-error">✕ La propriété « emial » n’existe pas. Vouliez-vous dire « email » ?</span>
          <span className="dt-ok">✓ 0 erreur</span>
        </div>
      </div>
      <p className="demo-caption">L’erreur est signalée pendant l’écriture, pas par vos clients en production.</p>
    </PlayInView>
  );
}

/** React Native: one codebase, two phones. */
export function ReactNativeDemo() {
  return (
    <PlayInView className="demo-rn">
      <div className="drn">
        <div className="drn-phone">
          <span className="drn-os">iOS</span>
          <span className="drn-card" />
          <span className="drn-line" />
          <span className="drn-line is-short" />
        </div>
        <div className="drn-source">
          <span className="drn-flow is-left" />
          <span className="drn-file">App.tsx</span>
          <span className="drn-flow is-right" />
        </div>
        <div className="drn-phone">
          <span className="drn-os">Android</span>
          <span className="drn-card" />
          <span className="drn-line" />
          <span className="drn-line is-short" />
        </div>
      </div>
      <p className="demo-caption">Un seul code, deux applications publiées sur l’App Store et Google Play.</p>
    </PlayInView>
  );
}
