const sunset = new URL(
  "https://images.unsplash.com/photo-1717145504584-b3dc25217927?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  import.meta.url
);
const mountains = new URL(
  "https://images.unsplash.com/photo-1716321952293-caa23fcd4d96?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  import.meta.url
);
const tuscany = new URL(
  "https://images.unsplash.com/photo-1716968921500-6bce26915c37?q=80&w=3123&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  import.meta.url
);
const italy = new URL(
  "https://images.unsplash.com/photo-1716718405882-5d80d89ea24e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  import.meta.url
);
const lake = new URL(
  "https://images.unsplash.com/photo-1716369414814-ff2eb72ff659?q=80&w=2828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  import.meta.url
);
const city = new URL(
  "https://images.unsplash.com/photo-1716396502668-26f0087e1c7d?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  import.meta.url
);

const initialCards = [
  {
    name: "Закат",
    link: sunset,
  },
  {
    name: "Горы",
    link: mountains,
  },
  {
    name: "Таскана",
    link: tuscany,
  },
  {
    name: "Италия",
    link: italy,
  },
  {
    name: "Озеро",
    link: lake,
  },
  {
    name: "Сити",
    link: city,
  },
];

export { initialCards };
