import { Metadata } from "next";

import { LegalPage, Placeholder } from "../_components/legal-page";

export const metadata: Metadata = {
  title: "Conditions générales de vente — Krealabs",
  description:
    "Conditions générales de vente des prestations de Krealabs : devis, paiement, délais, propriété intellectuelle, responsabilités.",
  alternates: { canonical: "https://krealabs.fr/legal/cgv" },
  robots: { index: true, follow: true },
};

export default function CGVPage() {
  return (
    <LegalPage
      eyebrow="Légal"
      title="Conditions générales de vente"
      lastUpdated="13 mai 2026"
    >
      <p>
        Les présentes Conditions Générales de Vente (ci-après
        «&nbsp;CGV&nbsp;») régissent les relations contractuelles entre
        le GIE <strong>Krealabs</strong> (ci-après «&nbsp;le
        Prestataire&nbsp;»), dont les coordonnées figurent dans les{" "}
        <a href="/legal/mentions-legales">mentions légales</a>, et toute
        personne physique ou morale (ci-après «&nbsp;le Client&nbsp;»)
        commandant une prestation auprès du Prestataire. Elles sont
        applicables à toute commande passée par le Client et prévalent
        sur les éventuelles conditions générales d&apos;achat du Client,
        sauf accord écrit contraire.
      </p>

      <h2>Article 1 — Objet</h2>
      <p>
        Les présentes CGV ont pour objet de définir les conditions dans
        lesquelles le Prestataire fournit au Client des prestations de
        conception, développement, intégration, maintenance et conseil
        dans les domaines du web, du mobile, du logiciel sur mesure, du
        design UX/UI, du référencement naturel et de la performance.
      </p>

      <h2>Article 2 — Devis et formation du contrat</h2>
      <p>
        Toute prestation fait l&apos;objet d&apos;un devis écrit, établi
        par le Prestataire à partir des éléments fournis par le Client.
        Le devis comprend :
      </p>
      <ul>
        <li>la description détaillée des prestations</li>
        <li>les livrables prévus</li>
        <li>le prix, les modalités de paiement et l&apos;échéancier</li>
        <li>les délais de réalisation indicatifs</li>
        <li>la durée de validité de l&apos;offre (30 jours par défaut)</li>
      </ul>
      <p>
        Le contrat est formé dès retour du devis daté, signé et
        accompagné de la mention manuscrite ou électronique
        «&nbsp;Bon pour accord&nbsp;», ainsi que du versement de
        l&apos;acompte prévu. À compter de cette acceptation, le Client
        ne pourra plus se prévaloir d&apos;un droit de rétractation,
        s&apos;agissant d&apos;un contrat conclu entre professionnels ou
        d&apos;une prestation personnalisée (art. L.221-28 du Code de la
        consommation).
      </p>

      <h2>Article 3 — Prix et conditions de paiement</h2>
      <p>
        Les prix sont exprimés en euros, hors taxes. La TVA en vigueur
        s&apos;ajoute, le cas échéant, au jour de la facturation. Sauf
        mention contraire au devis, les modalités de paiement sont les
        suivantes :
      </p>
      <ul>
        <li>
          <strong>30 % d&apos;acompte</strong> à la signature du devis
          (déclenchement du projet)
        </li>
        <li>
          <strong>40 %</strong> à mi-parcours, ou à validation d&apos;un
          jalon défini au devis
        </li>
        <li>
          <strong>30 % solde</strong> à la livraison définitive
        </li>
      </ul>
      <p>
        Les factures sont payables à <strong>30 jours date de
        facture</strong>, par virement bancaire sur le compte indiqué.
      </p>
      <p>
        Conformément aux articles L.441-10 et D.441-5 du Code de
        commerce, toute somme non réglée à l&apos;échéance entraîne de
        plein droit, sans mise en demeure préalable :
      </p>
      <ul>
        <li>
          des pénalités de retard au taux de <strong>3 fois le taux
          d&apos;intérêt légal</strong> en vigueur
        </li>
        <li>
          une indemnité forfaitaire de recouvrement de{" "}
          <strong>40 €</strong> par facture (justifiable d&apos;une
          indemnisation complémentaire sur présentation de justificatifs)
        </li>
      </ul>
      <p>
        Le non-paiement d&apos;une facture peut entraîner la suspension
        immédiate des prestations en cours et la non-livraison des
        livrables non encore réglés.
      </p>

      <h2>Article 4 — Délais de réalisation</h2>
      <p>
        Les délais indiqués au devis sont donnés à titre indicatif et
        dépendent de la fourniture en temps utile par le Client des
        éléments nécessaires (contenus, accès, validations). Un retard du
        Client dans la transmission de ces éléments décale d&apos;autant
        les délais de livraison. Le Prestataire s&apos;engage à informer
        le Client de tout retard significatif dans les meilleurs délais.
      </p>

      <h2>Article 5 — Obligations du Prestataire</h2>
      <p>
        Le Prestataire est tenu d&apos;une <strong>obligation de
        moyens</strong>. Il met en œuvre l&apos;ensemble des compétences,
        outils et précautions raisonnables pour la bonne exécution des
        prestations, en se conformant aux règles de l&apos;art et aux
        standards techniques en vigueur.
      </p>

      <h2>Article 6 — Obligations du Client</h2>
      <p>Le Client s&apos;engage à :</p>
      <ul>
        <li>
          fournir au Prestataire l&apos;ensemble des éléments,
          informations et accès nécessaires à la bonne exécution des
          prestations
        </li>
        <li>collaborer activement et valider les livrables intermédiaires</li>
        <li>
          régler les factures aux échéances convenues
        </li>
        <li>
          garantir le Prestataire contre toute revendication relative aux
          contenus (textes, images, vidéos, marques) qu&apos;il lui
          confie pour intégration
        </li>
      </ul>

      <h2>Article 7 — Propriété intellectuelle</h2>
      <p>
        Les éléments créés spécifiquement pour le Client dans le cadre
        des prestations (code source applicatif, design, maquettes,
        contenus rédigés) lui sont cédés à titre exclusif et sans
        limitation de durée, <strong>après paiement intégral</strong> des
        factures correspondantes.
      </p>
      <p>
        Le Prestataire conserve néanmoins :
      </p>
      <ul>
        <li>
          ses outils internes, méthodes, bibliothèques, frameworks et
          briques de code génériques préexistants ou développés à
          l&apos;occasion d&apos;autres missions, qui restent sa
          propriété exclusive
        </li>
        <li>
          le droit de citer la mission réalisée dans son portfolio,
          références commerciales et communications (sauf clause de
          confidentialité contraire au devis ou demande écrite du Client)
        </li>
      </ul>
      <p>
        Les bibliothèques tierces et logiciels open source utilisés
        restent soumis à leurs licences propres.
      </p>

      <h2>Article 8 — Confidentialité</h2>
      <p>
        Chacune des parties s&apos;engage à conserver confidentielles
        toutes informations, documents et données auxquels elle pourrait
        avoir accès dans le cadre de la mission, et à ne pas les divulguer
        à des tiers sans accord écrit préalable. Cette obligation
        s&apos;applique pendant toute la durée du contrat et pour une
        période de <strong>3 ans</strong> à compter de la fin de la
        mission.
      </p>

      <h2>Article 9 — Responsabilité</h2>
      <p>
        La responsabilité du Prestataire ne peut être engagée qu&apos;en
        cas de faute prouvée. En toute hypothèse, le montant total de
        l&apos;indemnisation ne pourra excéder le{" "}
        <strong>montant total facturé</strong> au Client au titre des
        prestations à l&apos;origine du dommage, sur les{" "}
        <strong>12 mois</strong> précédant l&apos;événement générateur.
      </p>
      <p>
        Le Prestataire ne saurait être tenu responsable :
      </p>
      <ul>
        <li>
          des dommages indirects (perte d&apos;exploitation, de chiffre
          d&apos;affaires, de clientèle, atteinte à l&apos;image)
        </li>
        <li>
          des interruptions de service ou pertes de données dues à des
          tiers (hébergeur, fournisseurs SaaS, opérateurs réseau)
        </li>
        <li>des conséquences d&apos;un usage non conforme des livrables</li>
        <li>
          des contenus fournis par le Client ou de leur conformité aux
          réglementations applicables
        </li>
      </ul>

      <h2>Article 10 — Force majeure</h2>
      <p>
        Aucune des parties ne peut être tenue responsable d&apos;un
        retard ou d&apos;une inexécution résultant d&apos;un cas de
        force majeure au sens de l&apos;article 1218 du Code civil. La
        partie empêchée en informe l&apos;autre dans les meilleurs
        délais. Si l&apos;événement perdure au-delà de 60 jours, chacune
        des parties peut résilier le contrat par lettre recommandée avec
        accusé de réception, sans indemnité.
      </p>

      <h2>Article 11 — Résiliation</h2>
      <p>
        En cas de manquement grave de l&apos;une des parties à ses
        obligations, et après mise en demeure restée sans effet pendant{" "}
        <strong>15 jours</strong>, l&apos;autre partie pourra résilier le
        contrat par lettre recommandée avec accusé de réception, sans
        préjudice de tous dommages et intérêts.
      </p>
      <p>
        En cas de résiliation aux torts du Client, les prestations déjà
        réalisées seront facturées au prorata, et l&apos;acompte
        éventuellement versé restera acquis au Prestataire.
      </p>

      <h2>Article 12 — Protection des données personnelles</h2>
      <p>
        Le Prestataire et le Client s&apos;engagent à respecter, chacun
        pour ce qui le concerne, le Règlement (UE) 2016/679 (RGPD) et la
        loi n° 78-17 du 6 janvier 1978. Lorsque la mission implique le
        traitement de données personnelles pour le compte du Client, un{" "}
        <strong>accord de sous-traitance RGPD</strong> spécifique est
        annexé au devis, conformément à l&apos;article 28 du RGPD.
      </p>
      <p>
        Les modalités de traitement des données collectées sur le site
        krealabs.fr sont décrites dans notre{" "}
        <a href="/legal/politique-confidentialite">
          politique de confidentialité
        </a>
        .
      </p>

      <h2>Article 13 — Référencement et communication</h2>
      <p>
        Sauf demande écrite contraire du Client, le Prestataire pourra
        mentionner le nom et le logo du Client dans ses références
        commerciales (site web, présentations, réseaux sociaux,
        portfolio).
      </p>

      <h2>Article 14 — Réclamation et médiation</h2>
      <p>
        En cas de litige, les parties s&apos;engagent à rechercher en
        priorité une solution amiable. À défaut, tout consommateur
        (Client personne physique non professionnelle) peut recourir
        gratuitement à un médiateur de la consommation conformément aux
        articles L.611-1 et suivants du Code de la consommation.
      </p>
      <p>
        Coordonnées du médiateur référencé :{" "}
        <Placeholder>NOM ET COORDONNÉES DU MÉDIATEUR</Placeholder>.
      </p>

      <h2>Article 15 — Droit applicable et juridiction</h2>
      <p>
        Les présentes CGV sont soumises au <strong>droit
        français</strong>. À défaut de résolution amiable, tout litige
        relatif à leur formation, leur exécution ou leur interprétation
        sera soumis à la compétence exclusive du{" "}
        <strong>Tribunal de commerce</strong> du ressort du siège du
        Prestataire, sauf disposition d&apos;ordre public contraire
        applicable aux relations avec un consommateur.
      </p>

      <h2>Article 16 — Modifications</h2>
      <p>
        Les présentes CGV peuvent être modifiées à tout moment par le
        Prestataire. La version applicable à une mission est celle en
        vigueur à la date d&apos;acceptation du devis correspondant.
      </p>
    </LegalPage>
  );
}
