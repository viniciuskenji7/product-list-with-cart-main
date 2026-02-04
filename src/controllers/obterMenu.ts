import menu from '@/api/menu.json';
import type IMenu from '@/interfaces/IMenu';

export default function obterMenu() {

  const response = menu;

  const foods: IMenu[] = response;

  return foods;
}
