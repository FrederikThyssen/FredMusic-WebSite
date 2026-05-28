import { PageShell } from "./PageShell";

type LegalPageProps = {
  title: string;
};

export function LegalPage({ title }: LegalPageProps) {
  return (
    <PageShell
      eyebrow="Informations légales"
      title={title}
      description="Placeholder légal mocké à compléter dans l'étape documentation et contenu."
    />
  );
}
