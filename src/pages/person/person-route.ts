import Person from "./person.vue";

export const personRoutes = [
  {
    path: "/person/:id?",
    name: "Person",
    component: Person,
    props: true
  },
];

