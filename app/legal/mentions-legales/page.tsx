import { Metadata } from "next";

import { LegalPage, Placeholder } from "../_components/legal-page";

export const metadata: Metadata = {
  title: "Mentions légales — Krealabs",
  description:
    "Informations légales relatives à l'édition du site krealabs.fr : éditeur, hébergeur, propriété intellectuelle, contact.",
  alternates: { canonical: "https://krealabs.fr/legal/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      eyebrow="Légal"
      title="Mentions légales"
      lastUpdated="13 mai 2026"
    >
      <p>
        Conformément aux dispositions des articles 6-III et 19 de la loi
        n° 2004-575 du 21 juin 2004 pour la Confiance dans l&apos;économie
        numérique, dite L.C.E.N., les informations suivantes sont portées à
        la connaissance des utilisateurs du site{" "}
        <a href="https://krealabs.fr">krealabs.fr</a>.
      </p>

      <h2>Éditeur du site</h2>
      <p>
        Le site krealabs.fr est édité par <strong>Krealabs</strong>, Groupement
        d&apos;Intérêt Économique (GIE) régi par les articles L.251-1 à
        L.251-23 du Code de commerce.
      </p>
      <ul>
        <li>
          <strong>Dénomination :</strong> Krealabs
        </li>
        <li>
          <strong>Forme juridique :</strong> Groupement d&apos;Intérêt
          Économique (GIE)
        </li>
        <li>
          <strong>SIRET :</strong> <Placeholder>SIRET</Placeholder>
        </li>
        <li>
          <strong>RCS :</strong>{" "}
          <Placeholder>RCS DE [VILLE] - N° XXX XXX XXX</Placeholder>
        </li>
        <li>
          <strong>Siège social :</strong>{" "}
          <Placeholder>ADRESSE COMPLÈTE DU SIÈGE</Placeholder>
        </li>
        <li>
          <strong>N° TVA intracommunautaire :</strong>{" "}
          <Placeholder>FRXX XXX XXX XXX</Placeholder> (le cas échéant)
        </li>
        <li>
          <strong>Email :</strong>{" "}
          <a href="mailto:contact@krealabs.fr">contact@krealabs.fr</a>
        </li>
        <li>
          <strong>Téléphone :</strong>{" "}
          <Placeholder>TÉLÉPHONE</Placeholder> (le cas échéant)
        </li>
      </ul>

      <h2>Membres du GIE</h2>
      <p>Le GIE Krealabs est constitué des membres suivants :</p>
      <ul>
        <li>
          <strong>Maxime Dubois</strong> —{" "}
          <Placeholder>FORME JURIDIQUE MEMBRE 1 (ex : EI)</Placeholder>,
          immatriculé sous le SIRET{" "}
          <Placeholder>SIRET MEMBRE 1</Placeholder>
        </li>
        <li>
          <strong>Romain Clatot</strong> —{" "}
          <Placeholder>FORME JURIDIQUE MEMBRE 2 (ex : EI)</Placeholder>,
          immatriculé sous le SIRET{" "}
          <Placeholder>SIRET MEMBRE 2</Placeholder>
        </li>
      </ul>

      <h2>Administrateur du GIE et directeur de la publication</h2>
      <p>
        L&apos;administrateur du GIE, également directeur de la publication
        du site krealabs.fr, est <Placeholder>NOM ADMINISTRATEUR</Placeholder>.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site krealabs.fr est hébergé par <strong>Vercel Inc.</strong>,
        société de droit américain dont le siège social est situé au :
      </p>
      <ul>
        <li>440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis</li>
        <li>Site web : <a href="https://vercel.com">vercel.com</a></li>
      </ul>
      <p>
        Les données de la base sont hébergées par <strong>Neon Inc.</strong>{" "}
        (PostgreSQL managé) dans la région{" "}
        <strong>eu-central-1 (Francfort, UE)</strong>. Les envois d&apos;emails
        transactionnels passent par <strong>Resend Inc.</strong>{" "}
        (2261 Market Street, San Francisco, CA 94114, États-Unis).
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble du contenu présent sur le site krealabs.fr (textes,
        photographies, illustrations, logos, vidéos, design, code source,
        marques) est la propriété exclusive de Krealabs ou fait l&apos;objet
        d&apos;une autorisation d&apos;utilisation. Toute reproduction,
        représentation, modification, publication, adaptation, totale ou
        partielle, de ces éléments, quel que soit le moyen ou le procédé
        utilisé, est interdite sans l&apos;autorisation écrite préalable de
        Krealabs.
      </p>
      <p>
        Toute exploitation non autorisée du site ou de l&apos;un de ses
        éléments est susceptible d&apos;être considérée comme constitutive
        d&apos;une contrefaçon et poursuivie conformément aux dispositions
        des articles L.335-2 et suivants du Code de la propriété
        intellectuelle.
      </p>

      <h2>Liens hypertextes</h2>
      <p>
        Le site krealabs.fr peut contenir des liens hypertextes vers
        d&apos;autres sites présents sur le réseau Internet. Krealabs ne
        peut être tenu responsable de leur contenu, ni de la manière dont
        les données personnelles sont traitées sur ces sites tiers.
      </p>
      <p>
        Tout site public ou privé est autorisé à établir un lien vers les
        pages de krealabs.fr sans demande d&apos;autorisation préalable,
        sous réserve que ce lien ne soit pas trompeur, ne porte pas
        atteinte à l&apos;image de Krealabs et précise clairement sa
        provenance.
      </p>

      <h2>Données personnelles &amp; cookies</h2>
      <p>
        Le traitement des données personnelles collectées via les
        formulaires de contact et la liste d&apos;attente, ainsi que
        l&apos;utilisation éventuelle de cookies, sont décrits en détail
        dans notre{" "}
        <a href="/legal/politique-confidentialite">
          politique de confidentialité
        </a>
        .
      </p>

      <h2>Crédits</h2>
      <p>
        Conception et développement : Krealabs (
        <a href="https://krealabs.fr">krealabs.fr</a>).
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative aux présentes mentions légales,
        contactez-nous à{" "}
        <a href="mailto:contact@krealabs.fr">contact@krealabs.fr</a>.
      </p>
    </LegalPage>
  );
}
