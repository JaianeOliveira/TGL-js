(() => {
  const App = () => {
    const $total = document.querySelector('[ data-js="total"]');
    const $gameDescription = document.querySelector('[data-js="gameDescription"]');
    const $tbody = document.querySelector('tbody');

    let gameData = [];
    let selectedNumbers = [];
    let valorTotal = [];
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

      createCartItem(gameIndex) {
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
        $numbers.textContent = selectedNumbers;
        $cartItemDetails.appendChild($numbers);
        $gameName.textContent = gameData[gameIndex].type;
        $itemValue.textContent = ` R$ ${gameData[gameIndex].price}`;
        valorTotal += gameData[gameIndex].price;
        $total.textContent = valorTotal;
        $gameName.appendChild($itemValue);
        $cartItemDetails.appendChild($gameName);
        $cartItem.appendChild($button);
        $cartItem.appendChild($cartItemDetails);
        $cart.appendChild($cartItem);

        $button.addEventListener('click', () => {
          valorTotal -= gameData[gameIndex].price;
          $total.textContent = valorTotal;
          $cartItem.parentNode.removeChild($cartItem);
        });
      },

      completeGame(gameIndex) {
        selectedNumbers.splice(0, selectedNumbers.length);
        let count = 1;
        while (count <= gameData[gameIndex]['max-number']) {
          const num = this.generateRandomNumbers(gameIndex);
          if (selectedNumbers.every((item) => item !== num)) {
            selectedNumbers.push(num);
            count += 1;
          }
          selectedNumbers.sort();
        }
      },

      /* setDataInit() {
        $selectQuina.addEventListener('click', (e) => {
          selectedNumbers.splice(0, selectedNumbers.length);
          this.getDescription(2);
          this.createTableButtons(2);
          this.setButtonGameColor(2, e);
          $selectMegasena.style.backgroundColor = '#FFFFFF';
          $selectMegasena.style.color = gameData[1].color;
          $selectLotofacil.style.backgroundColor = '#FFFFFF';
          $selectLotofacil.style.color = gameData[0].color;
        });
        $selectMegasena.addEventListener('click', (e) => {
          selectedNumbers.splice(0, selectedNumbers.length);
          this.getDescription(1);
          this.createTableButtons(1);
          this.setButtonGameColor(1, e);
          $selectLotofacil.style.backgroundColor = '#FFFFFF';
          $selectLotofacil.style.color = gameData[0].color;
          $selectQuina.style.backgroundColor = '#FFFFFF';
          $selectQuina.style.color = gameData[2].color;
        });
        $selectLotofacil.addEventListener('click', (e) => {
          selectedNumbers.splice(0, selectedNumbers.length);
          this.getDescription(0);
          this.createTableButtons(0);
          this.setButtonGameColor(0, e);
          $selectMegasena.style.backgroundColor = '#FFFFFF';
          $selectMegasena.style.color = gameData[1].color;
          $selectQuina.style.backgroundColor = '#FFFFFF';
          $selectQuina.style.color = gameData[2].color;
        });

        $selectLotofacil.textContent = gameData[0].type;
        $selectLotofacil.style.color = gameData[0].color;
        $selectLotofacil.style.borderColor = gameData[0].color;

        $selectMegasena.textContent = gameData[1].type;
        $selectMegasena.style.color = gameData[1].color;
        $selectMegasena.style.borderColor = gameData[1].color;

        $selectQuina.style.color = gameData[2].color;
        $selectQuina.textContent = gameData[2].type;
        $selectQuina.style.borderColor = gameData[2].color;
      }, */

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
              return alert('Quantidade máxima selecionada!');
            }
            if (selectedNumbers.every((elem) => elem !== $button.textContent)) {
              e.currentTarget.style.backgroundColor = this.activeButtonColor(gameIndex);
              return selectedNumbers.push($button.textContent);
            }
            return alert('Esse número já está selecionado');
          });
          $button.appendChild(text);
          $td.appendChild($button);
          $button.className = 'buttonNumberTable';
          $tr.appendChild($td);
          count += 1;
          $tbody.appendChild($tr);

          if (count === 25) {
            // eslint-disable-next-line no-loop-func
            $completeGame.addEventListener('click', () => {
              this.completeGame(gameIndex);
              this.createCartItem(gameIndex);
              selectedNumbers.splice(0, selectedNumbers.length);
              this.createTableButtons(gameIndex);
            });
            // eslint-disable-next-line no-loop-func
            $clearGame.addEventListener('click', () => {
              selectedNumbers.splice(0, selectedNumbers.length);
              this.createTableButtons(gameIndex);
            });
            // eslint-disable-next-line no-loop-func
            $addToCard.addEventListener('click', () => {
              if (selectedNumbers.length === gameData[gameIndex]['max-number']) {
                selectedNumbers = selectedNumbers.sort();
                this.createCartItem(gameIndex);
                selectedNumbers.splice(0, selectedNumbers.length);
                this.createTableButtons(gameIndex);
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
