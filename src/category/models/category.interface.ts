export interface CategoryKey {
  id: string;
}


export interface Category extends CategoryKey {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
}
