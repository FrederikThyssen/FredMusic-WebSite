import { Badge } from "../components/ui/Badge";

type LegalPageProps = {
  title: string;
};

type LegalSection = {
  title: string;
  content: string[];
};

const owner = {
  name: "Fréderic WILKOSZ",
  address: "62156 Vis-en-Artois, France",
  email: "djfredmusic@outlook.fr",
  phone: "06 48 13 55 56",
  siren: "813 426 483",
  ape: "9329 Z",
};

const legalNoticeSections: LegalSection[] = [
  {
    title: "Éditeur du site",
    content: [
      `Le site Fredmusic est édité par ${owner.name}, prestataire DJ et événementiel.`,
      `Adresse : ${owner.address}.`,
      `Contact : ${owner.email} - ${owner.phone}.`,
      `SIREN : ${owner.siren}. Code APE : ${owner.ape}.`,
    ],
  },
  {
    title: "Responsable de publication",
    content: [`Le responsable de publication du site est ${owner.name}.`],
  },
  {
    title: "Hébergement",
    content: [
      "Le client possède déjà son hébergeur et son nom de domaine.",
      "Les informations complètes de l'hébergeur seront ajoutées avant la mise en ligne définitive.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "Les textes, visuels, photos, logos et éléments graphiques présents sur ce site sont protégés.",
      "Toute reproduction ou réutilisation sans autorisation préalable est interdite.",
    ],
  },
];

const privacySections: LegalSection[] = [
  {
    title: "Données collectées",
    content: [
      "Le site peut collecter les informations transmises volontairement via le formulaire de contact ou la demande de musique.",
      "Ces données peuvent inclure le nom, l'adresse email, le téléphone, la date d'événement, le lieu, le message, l'artiste et le titre demandé.",
    ],
  },
  {
    title: "Utilisation des données",
    content: [
      "Les informations sont utilisées uniquement pour répondre aux demandes de devis, préparer une prestation ou gérer les suggestions musicales d'un événement.",
      "Les demandes de musique restent des propositions : Fredmusic conserve la maîtrise de la playlist et de l'ambiance de la soirée.",
    ],
  },
  {
    title: "Conservation",
    content: [
      "Les données sont conservées uniquement le temps nécessaire au traitement de la demande et au suivi commercial raisonnable.",
      "La version actuelle du site utilise encore un fonctionnement mocké/local pour préparer le futur backend.",
    ],
  },
  {
    title: "Partage et confidentialité",
    content: [
      "Les données ne sont pas revendues.",
      "Elles peuvent être consultées uniquement par Fredmusic ou par les personnes intervenant techniquement sur le site dans le cadre de sa maintenance.",
    ],
  },
  {
    title: "Droits des personnes",
    content: [
      `Vous pouvez demander l'accès, la correction ou la suppression de vos données en écrivant à ${owner.email}.`,
    ],
  },
  {
    title: "Cookies",
    content: [
      "Le site n'utilise pas de cookie publicitaire dans sa version actuelle.",
      "Si un outil de mesure d'audience est ajouté plus tard, cette page sera mise à jour.",
    ],
  },
];

const termsSections: LegalSection[] = [
  {
    title: "Utilisation du site",
    content: [
      "Le site présente les prestations Fredmusic et permet de prendre contact pour un événement.",
      "Les informations publiées sont données à titre indicatif et peuvent évoluer selon les besoins, le lieu et la disponibilité.",
    ],
  },
  {
    title: "Demandes de devis",
    content: [
      "L'envoi d'un formulaire ne vaut pas réservation ferme.",
      "Une prestation est confirmée uniquement après échange avec Fredmusic et validation des conditions convenues.",
    ],
  },
  {
    title: "Demandes de musique",
    content: [
      "Les invités peuvent proposer des titres via le formulaire de demande de musique.",
      "Fredmusic reste libre de valider, refuser ou adapter les titres selon l'ambiance, le public et le déroulement de l'événement.",
    ],
  },
  {
    title: "Disponibilité du site",
    content: [
      "Fredmusic s'efforce de maintenir le site accessible, mais une interruption temporaire peut survenir pour maintenance ou incident technique.",
    ],
  },
];

function getLegalContent(title: string) {
  if (title.toLowerCase().includes("confidentialité")) {
    return {
      eyebrow: "Confidentialité",
      description:
        "Informations sur les données transmises via les formulaires Fredmusic et leur utilisation.",
      sections: privacySections,
    };
  }

  if (title.toLowerCase().includes("conditions")) {
    return {
      eyebrow: "Conditions",
      description: "Conditions d'utilisation du site Fredmusic, des formulaires et de la demande de musique.",
      sections: termsSections,
    };
  }

  return {
    eyebrow: "Informations légales",
    description: "Informations d'identification de Fredmusic et cadre légal du site.",
    sections: legalNoticeSections,
  };
}

export function LegalPage({ title }: LegalPageProps) {
  const content = getLegalContent(title);

  return (
    <div className="bg-night-950 text-ivory">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Badge>{content.eyebrow}</Badge>
        <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-ivory sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/72">{content.description}</p>
      </section>

      <section className="border-t border-white/[0.07] bg-night-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-5">
          {content.sections.map((section) => (
            <article key={section.title} className="rounded-md border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
              <h2 className="font-display text-2xl leading-tight text-ivory sm:text-3xl">{section.title}</h2>
              <div className="mt-4 grid gap-3 text-sm leading-7 text-ivory/72 sm:text-base">
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
