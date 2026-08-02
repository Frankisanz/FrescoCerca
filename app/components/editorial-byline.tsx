import Link from "next/link";
import { siteConfig } from "@/lib/site";
import styles from "./editorial-byline.module.css";

export function EditorialByline({
  sourceSummary,
  reviewedOn = "2 de agosto de 2026",
}: {
  sourceSummary: string;
  reviewedOn?: string;
}) {
  return (
    <aside className={styles.byline} aria-label="Responsabilidad editorial">
      <p className={styles.identity}>
        <span>Responsabilidad editorial</span>
        <Link href={siteConfig.editorial.profilePath}>
          {siteConfig.editorial.responsible}
        </Link>
      </p>
      <p className={styles.details}>
        Responsable editorial de {siteConfig.name} · Revisión: {reviewedOn}
      </p>
      <p className={styles.traceability}>
        {sourceSummary} Consulta la{" "}
        <Link href={`${siteConfig.editorial.methodologyPath}#correcciones`}>
          metodología y el proceso de correcciones
        </Link>
        .
      </p>
    </aside>
  );
}
