import { Select } from './Select';

const select = new Select({
  selector: '#select',
  label: 'Выберите технологию',
  url: 'https://vladilen-dev.firebaseio.com/technologies.json',
  onSelect(selectedItem) {
    console.log(selectedItem);
  }
});

const actions = document.querySelector('#actions');
actions.addEventListener('click', e => {
  switch (e.target.dataset.type) {
    case 'open':
      select.open();
      break;

    case 'close':
      select.close();
      break;

    case 'destroy':
      select.destroy();
      break;

    case 'get':
      if (select.selectedItem) {
        printDataToLog('#log', select.selectedItem.label);
      }
      break;

    case 'set':
      select.selectByIndex(5);
      break;

    case 'clear':
      select.clear();
      break;

    default:
      break;
  }
});

function printDataToLog(elSelector, data = '') {
  const el = document.querySelector(elSelector);
  el.innerHTML = data;
}
