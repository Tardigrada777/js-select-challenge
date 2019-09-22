import { Select } from './src/Select';

const select = new Select({
  selector: '#select',
  label: 'Выберите технологию',
  url: 'https://vladilen-dev.firebaseio.com/technologies.json',
  onSelect(selectedItem) {
    console.log(selectedItem);
  }
});

/* Открыть select */
const openBtn = document.querySelector('[data-type="open"]');
openBtn.addEventListener('click', () => {
  select.open();
});

/* Закрыть select */
const closeBtn = document.querySelector('[data-type="close"]');
closeBtn.addEventListener('click', () => {
  select.close();
});

/* Уничтожить select */
const destroyBtn = document.querySelector('[data-type="destroy"]');
destroyBtn.addEventListener('click', () => {
  select.destroy();
});

/* Получить выбранное значение */
const getBtn = document.querySelector('[data-type="get"]');
getBtn.addEventListener('click', () => {
  const log = document.querySelector('#log');
  if (select.selectedItem) {
    log.innerHTML = select.selectedItem.label;
  }
});

/* Выбрать по индексу */
const setBtn = document.querySelector('[data-type="set"]');
setBtn.addEventListener('click', () => {
  select.selectByIndex(5);
});

/* очистить выбор */
const clearBtn = document.querySelector('[data-type="clear"]');
clearBtn.addEventListener('click', () => {
  select.clear();
});
