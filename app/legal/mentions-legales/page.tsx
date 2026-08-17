import { Metadata } from "next";

import { LegalPage } from "../_components/legal-page";

export const metadata: Metadata = {
  title: "Mentions légales - Krealabs",
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
      lastUpdated="17 août 2026"
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
        Le site krealabs.fr est édité par le groupement d&apos;intérêt
        économique <strong>KREALABS</strong>, immatriculé au registre du
        commerce et des sociétés de Rouen.
      </p>
      <ul>
        <li>
          <strong>Dénomination sociale :</strong> KREALABS
        </li>
        <li>
          <strong>Forme juridique :</strong> Groupement d&apos;intérêt
          économique (GIE)
        </li>
        <li>
          <strong>Capital social :</strong> GIE constitué sans capital
          (art. L.251-3 du Code de commerce)
        </li>
        <li>
          <strong>SIREN :</strong> 993 760 248
        </li>
        <li>
          <strong>SIRET (siège) :</strong> 993 760 248 00019
        </li>
        <li>
          <strong>RCS :</strong> Rouen, n° 993 760 248 (immatriculation du
          21 novembre 2025)
        </li>
        <li>
          <strong>Code APE / NAF :</strong> 62.01Z - Programmation
          informatique
        </li>
        <li>
          <strong>Siège social :</strong> 24 allée du Clos Demont,
          76520 La Neuville-Chant-d&apos;Oisel, France
        </li>
        <li>
          <strong>N° TVA intracommunautaire :</strong> FR15 993 760 248
        </li>
        <li>
          <strong>Email :</strong>{" "}
          <a href="mailto:contact@krealabs.fr">contact@krealabs.fr</a>
        </li>
        <li>
          <strong>Téléphone :</strong>{" "}
          <a href="tel:+33781758188">07 81 75 81 88</a>
        </li>
      </ul>

      <h2>Représentants légaux</h2>
      <p>
        Le GIE Krealabs est administré par <strong>Maxime Dubois</strong> et{" "}
        <strong>Romain Clatot</strong>, administrateurs et membres du
        groupement. Le contrôle des comptes est assuré par{" "}
        <strong>Xavier Dubois</strong>.
      </p>

      <h2>Directeur de la publication</h2>
      <p>
        Le directeur de la publication du site krealabs.fr est{" "}
        <strong>Maxime Dubois</strong>, en qualité d&apos;administrateur du
        GIE Krealabs.
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
