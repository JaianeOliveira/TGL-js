(() => {
  const App = () => {
    const $total = document.querySelector('[ data-js="total"]');
    const $gameDescription = document.querySelector('[data-js="gameDescription"]');
    const $tbody = document.querySelector('tbody');

    let gameData = [];
    const selectedNumbers = [];
    let valorTotal = 0;
    const apostas = [];
    let ap = [];
    return {
      getData() {
        const ajax = new XMLHttpRequest();

        ajax.open('GET', './games.json');
        ajax.send();

        ajax.addEventListener('readystatechange', () => {
          if (ajax.readyState === 4 && ajax.status === 200) {
            try {
              gameData = JSON.parse(ajax.responseText);
              gameData = gameData.types;

              this.createTopButtons();
              this.functionInit(0, `select${gameData[0].type}`);
            } catch (e) {
              console.error(e);
            }
          }
        });

        this.createTopButtons();
        this.cartIsEmpty();
      },

      cartIsEmpty() {
        const $cart = document.querySelector('.cart');
        const $item = document.querySelector('.cartItem');

        if ($item === null) {
          const $emptyMensage = this.newElement('p');
          $emptyMensage.className = 'emptyMensage';
          $emptyMensage.textContent = 'O carrinho está vazio';
          $cart.appendChild($emptyMensage);
        }
      },

      newElement(elem) {
        return document.createElement(elem);
      },

      getDescription(gameIndex) {
        $gameDescription.textContent = gameData[gameIndex].description;
      },

      activeButtonColor(gameIndex) {
        return gameData[gameIndex].color;
      },

      generateRandomNumbers(gameIndex) {
        return Math.floor(Math.random() * (gameData[gameIndex].range - 1) + 1);
      },

      setButtonGameColor(gameIndex, name) {
        document.querySelectorAll('.gameSelect').forEach((item, index) => {
          // eslint-disable-next-line no-param-reassign
          item.style.backgroundColor = '#FFFFFF';
          // eslint-disable-next-line no-param-reassign
          item.style.color = gameData[index].color;
        });
        document.querySelector(`[data-js=${name}]`).style.backgroundColor = gameData[gameIndex].color;
        document.querySelector(`[data-js=${name}]`).style.color = '#FFFFFF';
      },

      functionInit(gameIndex, e) {
        const $gameName = document.querySelector('[data-js="nameGame"]');
        $gameName.textContent = gameData[gameIndex].type;
        this.getDescription(gameIndex);
        this.createTableButtons(gameIndex);
        this.setButtonGameColor(gameIndex, e);
        selectedNumbers.splice(0, selectedNumbers.length);
      },

      createTopButtons() {
        const $topButtonDiv = document.querySelector('.topButtons');
        console.log(gameData.length);
        gameData.forEach((item, index) => {
          const $button = this.newElement('button');
          $button.setAttribute('data-js', `select${item.type}`);
          $button.className = 'gameSelect';
          $button.style.borderColor = item.color;
          $button.style.color = item.color;
          $button.textContent = item.type;
          $button.addEventListener('click', this.functionInit.bind(this, index, `select${item.type}`));
          $topButtonDiv.appendChild($button);
        });
      },

      createBottomButtons() {
        const $div = document.querySelector('[data-js="bottomButtons"]');
        const $icon = this.newElement('i');
        const $completeGame = this.newElement('button');
        const $clearGame = this.newElement('button');
        const $addToCard = this.newElement('button');

        $div.innerHTML = '';

        $icon.classList.add('fas', 'fa-shopping-cart');
        $completeGame.className = 'buttonBottom1';
        $clearGame.className = 'buttonBottom1';
        $addToCard.className = 'buttonBottom2';

        $completeGame.setAttribute('data-js', 'completeGame');
        $clearGame.setAttribute('data-js', 'clearGame');
        $addToCard.setAttribute('data-js', 'addToCard');

        $completeGame.textContent = 'Complete Game';
        $addToCard.textContent = 'Add to Card';
        $clearGame.textContent = 'Clear game';

        $addToCard.appendChild($icon);
        $div.appendChild($completeGame);
        $div.appendChild($clearGame);
        $div.appendChild($addToCard);
      },

      /*   getId(gameIndex) {
        // eslint-disable-next-line max-len
        // eslint-disable-next-line max-len
        const id = apostas.findIndex((item) => item.aposta.every((elem, index) => elem ===
        +(selectedNumbers[index]) && item.name === gameData[gameIndex].type));
        if (id === -1) {
          return 0;
        }
        return id;
      }, */

      createCartItem(gameIndex) {
        console.log(apostas);
        const $cart = document.querySelector('.cart');
        const $cartItem = this.newElement('div');
        const $button = this.newElement('button');
        const $icon = this.newElement('i');
        const $cartItemDetails = this.newElement('div');
        const $numbers = this.newElement('p');
        const $gameName = this.newElement('p');
        const $itemValue = this.newElement('span');

        $icon.className = 'far fa-trash-alt';
        $cartItem.className = 'cartItem';
        $cartItemDetails.className = 'cartItemDetails';
        $cartItemDetails.style.borderLeft = `4px solid ${gameData[gameIndex].color}`;
        $numbers.className = 'numbersCart';

        $button.appendChild($icon);
        $numbers.textContent = selectedNumbers.sort((a, b) => a - b);
        $cartItemDetails.appendChild($numbers);
        $gameName.textContent = gameData[gameIndex].type;
        $itemValue.textContent = ` R$ ${gameData[gameIndex].price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;
        valorTotal += Number(gameData[gameIndex].price);
        $total.textContent = (valorTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
        $gameName.appendChild($itemValue);
        $cartItemDetails.appendChild($gameName);
        $cartItem.appendChild($button);
        $cartItem.appendChild($cartItemDetails);
        $cart.appendChild($cartItem);

        console.log(console.log($cartItem));
        $button.addEventListener('click', () => {
          valorTotal -= gameData[gameIndex].price;
          $total.textContent = valorTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
          /* // eslint-disable-next-line max-len
          console.log(this.getId(gameIndex));
          apostas.splice((this.getId(gameIndex)), 1);
          console.log(apostas); */
          $cartItem.parentNode.removeChild($cartItem);

          this.cartIsEmpty();
        });
      },

      completeGame(gameIndex) {
        const btns = document.querySelectorAll('.buttonNumberTable');
        btns.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.style.backgroundColor = '#ADC0C4';
        });
        selectedNumbers.splice(0, selectedNumbers.length);
        let count = 1;
        while (count <= gameData[gameIndex]['max-number']) {
          const num = this.generateRandomNumbers(gameIndex);
          if (selectedNumbers.every((item) => item !== num)) {
            selectedNumbers.push(num);
            count += 1;
          }
        }
        selectedNumbers.forEach((num) => {
          const btn = document.querySelector(`[value="${num}"]`);
          btn.style.backgroundColor = gameData[gameIndex].color;
        });
        ap = selectedNumbers.map((item) => +item);
        ap = ap.sort((a, b) => a - b);
      },

      existe(gameIndex) {
        // eslint-disable-next-line max-len
        return apostas.some((item) => item.aposta.every((elem, index) => elem === ap[index] && item.name === gameData[gameIndex].type));
      },

      createTableButtons(gameIndex) {
        $tbody.innerHTML = '';

        this.createBottomButtons();

        const $completeGame = document.querySelector('[data-js="completeGame"]');
        const $clearGame = document.querySelector('[data-js="clearGame"]');
        const $addToCard = document.querySelector('[data-js="addToCard"]');

        const $tr = this.newElement('tr');
        const $td = this.newElement('td');
        let count = 1;
        const { range } = gameData[gameIndex];
        while (count <= range) {
          const text = document.createTextNode(count);
          const $button = this.newElement('button');
          // eslint-disable-next-line consistent-return,no-loop-func
          $button.addEventListener('click', (e) => {
            if (selectedNumbers.length >= gameData[gameIndex]['max-number']) {
              if (selectedNumbers.some((elem) => elem === $button.textContent)) {
                const id = selectedNumbers.findIndex((elem) => elem === $button.textContent);
                e.target.style.backgroundColor = '#ADC0C4';
                return selectedNumbers.splice(id, 1);
              }
              return alert('Quantidade máxima selecionada!');
            }
            if (selectedNumbers.some((elem) => elem === $button.textContent)) {
              const id = selectedNumbers.findIndex((elem) => elem === $button.textContent);
              e.target.style.backgroundColor = '#ADC0C4';
              selectedNumbers.splice(id, 1);
              console.log(selectedNumbers);
            } else if (selectedNumbers.every((elem) => elem !== $button.textContent)) {
              e.target.style.backgroundColor = this.activeButtonColor(gameIndex);
              selectedNumbers.push($button.textContent);
              console.log(selectedNumbers);
            }
          });
          $button.appendChild(text);
          $td.appendChild($button);
          $button.className = 'buttonNumberTable';
          $button.setAttribute('value', count);
          $tr.appendChild($td);
          count += 1;
          $tbody.appendChild($tr);

          if (count === 25) {
            // eslint-disable-next-line no-loop-func
            $completeGame.addEventListener('click', () => {
              this.completeGame(gameIndex);
            });
            // eslint-disable-next-line no-loop-func
            $clearGame.addEventListener('click', () => {
              selectedNumbers.splice(0, selectedNumbers.length);
              this.createTableButtons(gameIndex);
            });
            // eslint-disable-next-line no-loop-func,consistent-return
            $addToCard.addEventListener('click', () => {
              if (selectedNumbers.length === gameData[gameIndex]['max-number']) {
                const $cart = document.querySelector('.cart');
                const $cartItem = document.querySelector('.cartItem');
                if ($cartItem === null) {
                  const $emptyMensage = document.querySelector('.emptyMensage');
                  $cart.removeChild($emptyMensage);
                }
                ap = selectedNumbers.map((item) => +item);
                ap = ap.sort((a, b) => a - b);
                if (this.existe(gameIndex)) {
                  alert('Você já fez essa aposta. Por favor escolha novamente!');
                  // eslint-disable-next-line no-unreachable
                  selectedNumbers.splice(0, selectedNumbers.length);
                  this.createTableButtons(gameIndex);
                } else {
                  // eslint-disable-next-line no-new-object
                  apostas.push(new Object({
                    name: gameData[gameIndex].type,
                    aposta: ap,
                  }));
                  this.createCartItem(gameIndex);
                  selectedNumbers.splice(0, selectedNumbers.length);
                  this.createTableButtons(gameIndex);
                }
              } else {
                alert(`Escolha mais ${(gameData[gameIndex]['max-number']) - (selectedNumbers.length)} números`);
              }
            });
          }
        }
      },
    };
  };

  App().getData();
})();
