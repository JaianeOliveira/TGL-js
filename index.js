(() => {
  const App = () => {
    const $selectLotofacil = document.querySelector('[data-js="selectLotofacil"]');
    const $selectMegasena = document.querySelector('[data-js="selectMegasena"]');
    const $selectLotomania = document.querySelector('[data-js="selectLotomania"]');
    const $completeGame = document.querySelector('[data-js="completeGame"]');
    const $clearGame = document.querySelector('[data-js="clearGame"]');
    const $addToCard = document.querySelector('[data-js="addToCard"]');

    const $gameDescription = document.querySelector('[data-js="gameDescription"]');
    const $tbody = document.querySelector('tbody');
    let gameData = [];
    const selectedNumbers = [];
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

      createCartItem(gameIndex) {
        const $cart = document.querySelector('.cart');
        const $cartItem = document.createElement('div');
        $cartItem.className = 'cartItem';
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
        $gameName.appendChild($itemValue);
        $cartItemDetails.appendChild($gameName);

        $cartItem.appendChild($button);
        $cartItem.appendChild($cartItemDetails);
        $cart.appendChild($cartItem);
        console.log($cartItem);
      },
      getDescription(gameIndex) {
        $gameDescription.textContent = gameData[gameIndex].description;
      },
      activeButtonColor(gameIndex) {
        return gameData[gameIndex].color;
      },
      generateRandomNumbers(gameIndex) {
        return Math.floor(Math.random() * gameData[gameIndex].range);
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
        });
        $selectMegasena.addEventListener('click', (e) => {
          selectedNumbers.splice(0, selectedNumbers.length);
          this.getDescription(1);
          this.createTableButtons(1);
          this.setButtonGameColor(1, e);
        });
        $selectLotofacil.addEventListener('click', (e) => {
          selectedNumbers.splice(0, selectedNumbers.length);
          this.getDescription(0);
          this.createTableButtons(0);
          this.setButtonGameColor(0, e);
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
            e.currentTarget.style.backgroundColor = this.activeButtonColor(gameIndex);
            selectedNumbers.push($button.textContent);
            console.log(selectedNumbers);
          });
          $button.appendChild(text);
          $td.appendChild($button);
          $button.className = 'buttonNumberTable';
          console.log('Criou um botão');
          $tr.appendChild($td);
          count += 1;
          $tbody.appendChild($tr);

          if (count === 25) {
            $clearGame.addEventListener('click', () => {
              selectedNumbers.splice(0, selectedNumbers.length);
              $button.style.backgroundColor = '#ADC0C4';
            });
            $addToCard.addEventListener('click', () => {
              this.createCartItem(gameIndex);
              selectedNumbers.splice(0, selectedNumbers.length);
            });
          }
        }
      },

    };
  };

  App().getData();
})();
