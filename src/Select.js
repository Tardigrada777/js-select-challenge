import { XHR } from './XHR';

export class Select {
  constructor(config) {
    this.root = document.querySelector(config.selector);
    this.xhr = new XHR(config.url);
    this.labelContent = config.label;
    this.items = [];

    this.input = null;
    this.label = null;
    this.list = null;
    this.loader = null;
    this.arrow = null;

    this._selectedItem = null;

    this.isOpen = false;

    this.onSelectCallback = config.onSelect;

    this.init();

    // эмуляция долгой загрузки
    setTimeout(() => {
      this.getItems();
    }, 1500);
  }

  init() {
    /*
      TODO: нужно обобщить код и убрать лишние повторения 
    */
    this.inputInit();
    this.labelInit();
    this.arrowInit();
    this.listInit();
    this.loaderInit();

    // Закрытие селекта по клику в любой области документа,
    // кроме самого селекта
    document.addEventListener(
      'click',
      e => {
        if (!this.root.contains(e.target)) {
          this.close();
        }
      },
      true
    );
  }

  inputInit() {
    this.input = document.createElement('div');
    this.input.classList.add('select__input');
    this.input.addEventListener('click', () => {
      this.toggle();
    });

    this.root.appendChild(this.input);
  }
  labelInit() {
    this.label = document.createElement('span');
    this.label.classList.add('select__label');
    this.label.innerText = this.labelContent;
    this.label.addEventListener('click', () => {
      this.toggle();
    });
    this.root.appendChild(this.label);
  }
  arrowInit() {
    this.arrow = document.createElement('div');
    this.arrow.classList.add('select__arrow');
    this.root.appendChild(this.arrow);
  }
  listInit() {
    this.list = document.createElement('ul');
    this.list.classList.add('selectList');
    this.root.appendChild(this.list);
  }
  loaderInit() {
    this.loader = document.createElement('div');
    this.loader.classList.add('lds-dual-ring');
    this.list.appendChild(this.loader);
  }

  set selectedItem(value) {
    this._selectedItem = value;
    if (this.isOpen) {
      this.input.innerText = value.label;
    }
  }

  get selectedItem() {
    return this._selectedItem;
  }

  open() {
    this.list.classList.remove('selectList--hidden');
    this.list.classList.add('selectList--open');
    this.label.classList.add('select__label--up');

    if (this.selectedItem) {
      this.input.innerText = this.selectedItem.label;
    }

    this.isOpen = true;
  }

  close() {
    if (!this.isOpen) return;

    this.list.classList.remove('selectList--open');
    this.list.classList.add('selectList--hidden');
    this.label.classList.remove('select__label--up');

    this.input.innerText = '';

    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
      this.isOpen = false;
    } else {
      this.open();
      this.isOpen = true;
    }
  }

  destroy() {
    this.root.innerHTML = '';
    this.root = null;
  }

  getItems() {
    this.get().then(res => {
      this.list.innerHTML = '';

      for (let key in res) {
        const item = res[key];
        const li = document.createElement('li');
        li.classList.add('selectList__item');
        li.dataset['label'] = item.label;
        li.innerText = item.label;

        li.addEventListener('click', () => {
          this.selectItem(li, item);
        });

        this.items.push(li);
        this.list.appendChild(li);
      }
    });
  }

  selectItem(li, item) {
    if (li === null) {
      this.items.forEach(item => {
        item.classList.remove('selectList__item--active');
      });
    } else {
      // Убираем активное состояние у всех остальных
      this.items.forEach(item => {
        item.classList.remove('selectList__item--active');
      });
      // Делаем выбранный item активным
      li.classList.toggle('selectList__item--active');
    }

    this.selectedItem = item;
    this.onSelectCallback.call(this, item);
  }

  selectByIndex(index) {
    let c = 1;
    this.items.map(item => {
      if (c === index) {
        this.selectItem(item, {
          label: item.dataset['label']
        });
      }
      c++;
    });
  }

  clear() {
    this.selectItem(null, null);
  }

  get() {
    return this.xhr.get();
  }
}
