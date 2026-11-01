import type { TimelineStep } from '../../src/content/types'

/* Le parcours (page À propos), du plus ancien au plus récent, d'après le profil LinkedIn.
   Les valeurs provisoires bloquent la mise en ligne (scripts/check-content.ts). */
export default [
  {
    kind: 'high school',
    dates: 'Sep 2020 – Jul 2022',
    title: 'Baccalauréat STI2D, digital systems (SIN)',
    place: 'Lycée Saint-Nicolas, Paris',
    text: 'The spark: building things with code, from electronics to software.',
  },
  {
    kind: 'student job',
    dates: 'Jul 2021',
    title: 'Setting up a logistics system',
    place: 'McPrice (Apple repair), Paris',
    text: 'First job: a more efficient parcel shipping system, including installing a label printer.',
  },
  {
    kind: 'student job',
    dates: 'Jul 2022',
    title: 'Stock manager',
    place: 'McPrice (Apple repair), Paris',
    text: 'Inventory and stock for the website, and a system to scan products when they are bought.',
  },
  {
    kind: 'school',
    dates: 'Sep 2022 – Jul 2027',
    title: 'Engineering degree, computer engineering',
    place: 'ESIEA, Paris · software engineering major',
    text: 'Team software projects, including on-board timing for a soapbox race.',
  },
  {
    kind: 'student job',
    dates: 'Jul 2023',
    title: 'eBay store',
    place: 'McPrice (Apple repair), Paris',
    text: 'Creating an eBay store and listing the products; along the way, repairing the camera system.',
  },
  {
    kind: 'student job',
    dates: 'Since Apr 2024',
    title: 'Bartender and waiter',
    place: 'Bangkok Café',
    text: 'Behind the bar and on the floor, alongside my studies.',
  },
  {
    kind: 'exchange',
    dates: 'Sep – Dec 2024',
    title: 'Semester abroad, electrical and electronic engineering',
    place: 'Seoul National University of Science and Technology, South Korea',
    text: 'A semester of study in South Korea.',
  },
  {
    kind: 'internship',
    dates: 'Apr – Jul 2026',
    title: 'Front-end web development internship',
    place: 'Assurance Maladie (Cnam, French national health insurance), Montreuil',
    text: 'The front end of the ameli account interface. The code is private.',
  },
] satisfies TimelineStep[]
