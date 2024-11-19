export type vennItemType = 'IMAGE' | 'TEXT';




 

export interface VennDiagramI {
  name: string, 
  category: string, 
  src: string,
  type: vennItemType;
}