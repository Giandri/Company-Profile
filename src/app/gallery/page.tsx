import InfiniteMenu from "@/Component/InfiniteMenu/InfiniteMenu";
import Image from "next/image";
const items = [
  {
    image: "/images/g1.png",
    link: "https://google.com/",
    title: "Analisa",
    description: "Analisa sampling yang dilakukan di lab",
  },
  {
    image: "/images/g2.png",
    link: "https://google.com/",
    title: "Sampling",
    description: "Pengambilan sampling udara",
  },
  {
    image: "/images/g3.png",
    link: "https://google.com/",
    title: "Sampling",
    description: "Pengambilan sampling udara",
  },
  {
    image: "/images/g4.png",
    link: "https://google.com/",
    title: "Sampling",
    description: "Pengambilan sampling udara",
  },
  {
    image: "/images/g5.png",
    link: "https://google.com/",
    title: "Sampling",
    description: "Pengambilan sampling udara",
  },
  {
    image: "/images/g6.png",
    link: "https://google.com/",
    title: "Analisa",
    description: "Analisa sampling yang dilakukan di lab",
  },
  {
    image: "/images/g7.png",
    link: "https://google.com/",
    title: "Analisa",
    description: "Analisa sampling yang dilakukan di lab",
  },
  {
    image: "/images/g8.png",
    link: "https://google.com/",
    title: "Analisa",
    description: "Analisa sampling yang dilakukan di lab",
  },
  {
    image: "/images/g9.png",
    link: "https://google.com/",
    title: "Sampling",
    description: "Pengambilan sampling air",
  },
  {
    image: "/images/g10.png",
    link: "https://google.com/",
    title: "Sampling",
    description: "Pengambilan sampling air",
  },
];

export default function Gallery() {
  return (
    <div style={{ height: "600px", position: "relative" }}>
      <InfiniteMenu items={items} />
    </div>
  );
}
