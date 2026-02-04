

export default interface IMenu {
  id: number,
  name: string;
  description: string;
  price: number;
  image: {
    desktop: string;
    tablet: string;
    mobile: string;
    thumbnail: string;
  }
  quantity: number;
}
