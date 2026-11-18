import { Metadata } from "next";

import { LegalPage } from "../_components/legal-page";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Krealabs",
  description:
    "Comment Krealabs collecte, utilise et protège vos données personnelles. Vos droits RGPD et les moyens de les exercer.",
  alternates: {
    canonical: "https://krealabs.fr/legal/politique-confidentialite",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Politique de confidentialité - Krealabs",
    description:
      "Comment Krealabs collecte, utilise et protège vos données personnelles. Vos droits RGPD et les moyens de les exercer.",
    url: "https://krealabs.fr/legal/politique-confidentialite",
    type: "website",
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage
      eyebrow="Légal"
      title="Politique de confidentialité"
      lastUpdated="13 mai 2026"
    >
      <p>
        La présente politique décrit les modalités de collecte et de
        traitement des données personnelles sur le site{" "}
        <a href="https://krealabs.fr">krealabs.fr</a>, conformément au
        Règlement (UE) 2016/679 (RGPD) et à la loi n° 78-17 du 6 janvier
        1978 modifiée (loi Informatique et Libertés).
      </p>

      <h2>Responsable de traitement</h2>
      <p>
        Le responsable de traitement est le GIE <strong>Krealabs</strong>{" "}
        (cf. <a href="/legal/mentions-legales">mentions légales</a>).
        L&apos;administrateur, <strong>Maxime Dubois</strong>, est en charge
        des questions relatives à la protection des données.
        Aucun Délégué à la Protection des Données (DPO) n&apos;a été désigné,
        Krealabs ne remplissant pas les critères de désignation obligatoire
        (art. 37 RGPD).
      </p>
      <p>
        Pour toute question, écrivez à{" "}
        <a href="mailto:contact@krealabs.fr">contact@krealabs.fr</a> avec en
        objet «&nbsp;Données personnelles&nbsp;».
      </p>

      <h2>Données collectées</h2>

      <h3>Formulaire de contact</h3>
      <p>
        Lorsque vous nous contactez via le formulaire disponible sur{" "}
        <a href="/contact">/contact</a>, les informations suivantes sont
        collectées :
      </p>
      <ul>
        <li>nom et prénom</li>
        <li>adresse email</li>
        <li>numéro de téléphone (facultatif)</li>
        <li>nom de l&apos;entreprise (facultatif)</li>
        <li>type de demande et nature du projet</li>
        <li>contenu du message libre</li>
        <li>
          horodatage et adresse IP technique de soumission (pour la
          protection contre les abus)
        </li>
      </ul>

      <h3>Liste d&apos;attente</h3>
      <p>
        Lorsque vous vous inscrivez à notre liste d&apos;attente,
        l&apos;adresse email seule est collectée, accompagnée de la date
        d&apos;inscription et de la source (site web).
      </p>

      <h3>Journaux techniques</h3>
      <p>
        Lors de votre navigation, le serveur qui héberge le site (OVH,
        France) peut conserver des journaux techniques (adresse IP, horodatage,
        type de navigateur, page consultée) pour des durées courtes à des
        fins de sécurité et de diagnostic.
      </p>

      <h2>Finalités et bases légales</h2>
      <ul>
        <li>
          <strong>Répondre à vos demandes de contact</strong> - base
          légale : exécution de mesures précontractuelles à votre demande
          (art. 6.1.b RGPD).
        </li>
        <li>
          <strong>Vous tenir informé via la liste d&apos;attente</strong> -
          base légale : votre consentement (art. 6.1.a RGPD), révocable à
          tout moment.
        </li>
        <li>
          <strong>Sécurité, prévention des abus, diagnostic
          technique</strong> - base légale : intérêt légitime du
          responsable de traitement (art. 6.1.f RGPD).
        </li>
        <li>
          <strong>Respect des obligations légales et comptables</strong> -
          base légale : obligation légale (art. 6.1.c RGPD).
        </li>
      </ul>

      <h2>Sous-traitants et destinataires</h2>
      <p>
        Vos données ne sont jamais vendues ni louées à des tiers à des
        fins commerciales. Elles sont accessibles uniquement aux membres
        du GIE Krealabs et aux sous-traitants techniques suivants,
        encadrés par des accords de traitement (DPA) conformes au RGPD :
      </p>
      <ul>
        <li>
          <strong>OVH SAS</strong> (France) - hébergement du site et de sa
          base de données (formulaires de contact, liste d&apos;attente) sur un
          serveur situé dans l&apos;Union européenne.
        </li>
        <li>
          <strong>Resend Inc.</strong> (États-Unis) - envoi des emails
          transactionnels (notification interne + accusé de réception
          visiteur).
        </li>
        <li>
          <strong>Proton AG</strong> (Suisse) - réception des emails du
          domaine krealabs.fr.
        </li>
      </ul>

      <h2>Transferts hors Union européenne</h2>
      <p>
        Un sous-traitant (Resend) est établi aux
        États-Unis. Les transferts éventuels de données personnelles vers
        ce pays sont encadrés par les{" "}
        <strong>Clauses Contractuelles Types</strong> de la Commission
        européenne (décision 2021/914) ou par la certification au{" "}
        <strong>EU-US Data Privacy Framework</strong>. Aucune donnée
        sensible (au sens de l&apos;art. 9 RGPD) n&apos;est transférée.
      </p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>
          <strong>Formulaires de contact</strong> : 36 mois à compter du
          dernier échange, puis archivage intermédiaire pendant 2 ans à
          des fins probatoires si nécessaire, avant suppression
          définitive.
        </li>
        <li>
          <strong>Liste d&apos;attente</strong> : jusqu&apos;au retrait du
          consentement par l&apos;intéressé, ou pendant 3 ans
          d&apos;inactivité.
        </li>
        <li>
          <strong>Données liées à une mission</strong> (devis, contrat,
          factures) : 10 ans, conformément aux obligations comptables et
          fiscales.
        </li>
        <li>
          <strong>Journaux techniques</strong> : 12 mois maximum.
        </li>
      </ul>

      <h2>Cookies et traceurs</h2>
      <p>
        Le site krealabs.fr utilise uniquement des cookies strictement
        nécessaires à son fonctionnement (préférences, sécurité). Ces
        cookies ne nécessitent pas votre consentement.
      </p>
      <p>
        Aucune mesure d&apos;audience n&apos;est effectuée sur le site et
        aucun traceur tiers n&apos;y est déposé.
      </p>
      <p>
        Si une solution d&apos;analyse plus avancée (cookies tiers,
        marketing) était activée à l&apos;avenir, une bannière de
        consentement serait mise en place et cette page mise à jour en
        conséquence.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez à tout moment des droits
        suivants sur vos données personnelles :
      </p>
      <ul>
        <li>
          <strong>Droit d&apos;accès</strong> - obtenir une copie des
          données que nous détenons sur vous.
        </li>
        <li>
          <strong>Droit de rectification</strong> - corriger des données
          inexactes ou incomplètes.
        </li>
        <li>
          <strong>Droit à l&apos;effacement</strong> («&nbsp;droit à
          l&apos;oubli&nbsp;»).
        </li>
        <li>
          <strong>Droit à la limitation</strong> du traitement.
        </li>
        <li>
          <strong>Droit d&apos;opposition</strong> à un traitement fondé
          sur l&apos;intérêt légitime.
        </li>
        <li>
          <strong>Droit à la portabilité</strong> des données fournies.
        </li>
        <li>
          <strong>Droit de retirer votre consentement</strong> à tout
          moment, sans remettre en cause la licéité des traitements
          antérieurs.
        </li>
        <li>
          <strong>Droit de définir des directives</strong> relatives au
          sort de vos données après votre décès.
        </li>
      </ul>
      <p>
        Pour exercer ces droits, écrivez-nous à{" "}
        <a href="mailto:contact@krealabs.fr">contact@krealabs.fr</a> en
        précisant votre demande. Une réponse vous sera apportée sous{" "}
        <strong>30 jours</strong> maximum. Une pièce d&apos;identité peut
        vous être demandée en cas de doute raisonnable sur votre identité.
      </p>

      <h2>Réclamation auprès de la CNIL</h2>
      <p>
        Si vous estimez que vos droits ne sont pas respectés, vous avez le
        droit d&apos;introduire une réclamation auprès de la Commission
        Nationale de l&apos;Informatique et des Libertés :{" "}
        <a
          href="https://www.cnil.fr/fr/plaintes"
          target="_blank"
          rel="noopener noreferrer"
        >
          cnil.fr/fr/plaintes
        </a>{" "}
        - 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
      </p>

      <h2>Modifications</h2>
      <p>
        La présente politique peut être modifiée à tout moment pour
        refléter les évolutions de nos pratiques, de nos outils ou de la
        réglementation. La date de dernière mise à jour est indiquée en
        haut de page.
      </p>
    </LegalPage>
  );
}
