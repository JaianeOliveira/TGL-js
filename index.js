(() => {
  const App = () => {
    const $selectLotofacil = document.querySelector('[data-js="selectLotofacil"]');
    const $selectMegasena = document.querySelector('[data-js="selectMegasena"]');
    const $selectLotomania = document.querySelector('[data-js="selectLotomania"]');
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
              this.setDataInit();
            } catch (e) {
              console.log('ERRO');
              console.log(e);
            }
          }
        });
      },
      createBottomButtons() {
        const $div = document.querySelector('[data-js="bottomButtons"]');
        $div.innerHTML = '';
        const $icon = document.createElement('i');
        $icon.classList.add('fas', 'fa-shopping-cart');
        const $completeGame = document.createElement('button');
        const $clearGame = document.createElement('button');
        const $addToCard = document.createElement('button');

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
        const index = valorTotal.length - 1;
        const $cart = document.querySelector('.cart');
        const $cartItem = document.createElement('div');
        $cartItem.className = 'cartItem';
        $cartItem.setAttribute('data-delete', index);
        const $button = document.createElement('button');
        const $icon = document.createElement('i');
        $icon.className = 'far fa-trash-alt';
        const $cartItemDetails = document.createElement('div');
        $cartItemDetails.className = 'cartItemDetails';
        $cartItemDetails.style.borderLeft = `4px solid ${gameData[gameIndex].color}`;
        const $numbers = document.createElement('p');
        $numbers.className = 'numbersCart';
        const $gameName = document.createElement('p');
        $gameName.className = 'otherDetailsCart';
        const $itemValue = document.createElement('span');

        $button.appendChild($icon);
        $numbers.textContent = selectedNumbers;
        $cartItemDetails.appendChild($numbers);
        $gameName.textContent = gameData[gameIndex].type;
        $itemValue.textContent = ` R$ ${gameData[gameIndex].price}`;
        valorTotal.push(+(gameData[gameIndex].price));
        $total.textContent = valorTotal.reduce((acc, item) => acc + item);
        $gameName.appendChild($itemValue);
        $cartItemDetails.appendChild($gameName);

        $cartItem.appendChild($button);
        $cartItem.appendChild($cartItemDetails);
        $cart.appendChild($cartItem);

        $button.addEventListener('click', () => {
          $total.textContent -= Number(gameData[gameIndex].price);
          valorTotal = valorTotal.splice(Number($cartItem.getAttribute('data-delete')), 1);
          $cartItem.parentNode.removeChild($cartItem);
        });
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
        console.log('números aleatórios', selectedNumbers);
      },
      setButtonGameColor(gameIndex, e) {
        e.currentTarget.style.backgroundColor = gameData[gameIndex].color;
        e.currentTarget.style.color = '#FFFFFF';
      },
      setDataInit() {
        $selectLotomania.addEventListener('click', (e) => {
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
          $selectLotomania.style.backgroundColor = '#FFFFFF';
          $selectLotomania.style.color = gameData[2].color;
        });
        $selectLotofacil.addEventListener('click', (e) => {
          selectedNumbers.splice(0, selectedNumbers.length);
          this.getDescription(0);
          this.createTableButtons(0);
          this.setButtonGameColor(0, e);
          $selectMegasena.style.backgroundColor = '#FFFFFF';
          $selectMegasena.style.color = gameData[1].color;
          $selectLotomania.style.backgroundColor = '#FFFFFF';
          $selectLotomania.style.color = gameData[2].color;
        });

        $selectLotofacil.textContent = gameData[0].type;
        $selectLotofacil.style.color = gameData[0].color;
        $selectLotofacil.style.borderColor = gameData[0].color;

        $selectMegasena.textContent = gameData[1].type;
        $selectMegasena.style.color = gameData[1].color;
        $selectMegasena.style.borderColor = gameData[1].color;

        $selectLotomania.style.color = gameData[2].color;
        $selectLotomania.textContent = gameData[2].type;
        $selectLotomania.style.borderColor = gameData[2].color;

        console.log(gameData);
      },
      createTableButtons(gameIndex) {
        $tbody.innerHTML = '';

        this.createBottomButtons();

        const $completeGame = document.querySelector('[data-js="completeGame"]');
        const $clearGame = document.querySelector('[data-js="clearGame"]');
        const $addToCard = document.querySelector('[data-js="addToCard"]');

        const $tr = document.createElement('tr');
        const $td = document.createElement('td');
        let count = 1;
        const { range } = gameData[gameIndex];
        console.log(range);
        while (count <= range) {
          const text = document.createTextNode(count);
          const $button = document.createElement('button');
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
          console.log('Criou um botão');
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
