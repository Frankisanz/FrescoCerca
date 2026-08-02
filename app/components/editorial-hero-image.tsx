import Image from "next/image";
import styles from "./editorial-hero-image.module.css";

export function EditorialHeroImage({
  caption,
  preload = false,
}: {
  caption: string;
  preload?: boolean;
}) {
  return (
    <figure className={styles.figure}>
      <Image
        className={styles.image}
        src="/images/frescocerca-refugio-editorial.webp"
        alt="Pueblo de montaña al anochecer, con viviendas de piedra y un valle arbolado"
        width={1600}
        height={900}
        sizes="(max-width: 760px) calc(100vw - 2rem), (max-width: 1240px) calc(100vw - 4rem), 1184px"
        quality={82}
        preload={preload}
      />
      <figcaption className={styles.caption}>
        Ilustración editorial. {caption}
      </figcaption>
    </figure>
  );
}
