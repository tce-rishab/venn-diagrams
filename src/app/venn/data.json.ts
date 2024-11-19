import { VennDiagramI } from "./venn.interface";

 const CATEGORIES: Array<{id: string, label: string}>  = [
    {id:'cat_1',  label:'Herbivore'},
    {id:'cat_2',  label:'Carnivore'},
    {id:'cat_3',  label:'Omnivore'}
  ];

  const CATEGORIES_SPORTS: Array<{id: string, label: string}>  = [
    {id:'cat_1',  label:'Outdoor Sports'},
    {id:'cat_2',  label:'Team Sports'},
    {id:'cat_3',  label:'Outdoor Team Sports'}
  ];

  const ITEMS_SPORTS:Array <VennDiagramI> = [
    { name: 'Hiking', category: 'cat_1', src: '/assets/sports/images/hiking-person.svg', type: 'IMAGE' },
    { name: 'Rugby', category: 'cat_3', src: '/assets/sports/images/rugby-3.svg', type: 'IMAGE' },
    { name: 'Cricket', category: 'cat_3', src: '/assets/sports/images/cricket-game.svg', type: 'IMAGE' },
    { name: 'Surfing', category: 'cat_1', src: '/assets/sports/images/surfing.svg', type: 'IMAGE' },
    { name: 'Soccer', category: 'cat_3', src: '/assets/sports/images/football.svg', type: 'IMAGE' },
    { name: 'Running', category: 'cat_1', src: '/assets/sports/images/running.svg', type: 'IMAGE' },
    { name: 'Volleyball', category: 'cat_2', src: '/assets/sports/images/volleyball.svg', type: 'IMAGE' },
    { name: 'Ice Hockey', category: 'cat_2', src: '/assets/sports/images/ice-hockey.svg', type: 'IMAGE' },
    { name: 'Basketball', category: 'cat_2', src: '/assets/sports/images/basketball.svg', type: 'IMAGE' }
  ];
  
  const ITEMS:Array <VennDiagramI> = [
    { name: 'Cow', category: 'cat_1', src: '/assets/images/cow.svg', type: 'IMAGE' },
    { name: 'Lion', category: 'cat_2', src: '/assets/images/lion.svg', type: 'IMAGE' },
    { name: 'Dog', category: 'cat_3', src: '/assets/images/dog.svg', type: 'IMAGE' },
    { name: 'Deer', category: 'cat_1', src: '/assets/images/deer.svg', type: 'IMAGE' },
    { name: 'Badger', category: 'cat_3', src: '/assets/images/badger.svg', type: 'IMAGE' },
    { name: 'Giraffe', category: 'cat_1', src: '/assets/images/giraffe.svg', type: 'IMAGE' },
    { name: 'Polar Bear', category: 'cat_2', src: '/assets/images/polar-bear.svg', type: 'IMAGE' },
    { name: 'dolphin', category: 'cat_2', src: '/assets/images/dolphin.svg', type: 'IMAGE' },
    { name: 'Rhinoceros', category: 'cat_1', src: '/assets/images/rhinoceros.svg', type: 'IMAGE' }
  ];

export const VENNOBJECT = {
    animals: {
        id: `vobj-101`,
        type: 'animals',
        subtitle: `sort the animals in the correct section of Venn Diagram below!`,
        catagories: CATEGORIES,
        items: ITEMS,
        title: `Drag & Drop <=> Click and Click`
    },
    sports: {
        id: `vobj-102`,
        type: 'sports',
        subtitle: `sort the sports in the correct section of Venn Diagram below!`,
        catagories: CATEGORIES_SPORTS,
        items: ITEMS_SPORTS,
        title: `Drag & Drop <=> Click and Click`
    }
}