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
      getDescription(gameIndex) {
        $gameDescription.textContent = gameData[gameIndex].description;
      },
      activeButtonColor(gameIndex) {
        return gameData[gameIndex].color;
      },
      setDataInit() {
        $selectLotomania.addEventListener('click', () => {
          this.getDescription(2);
          this.createTableButtons(2);
        });
        $selectMegasena.addEventListener('click', () => {
          this.getDescription(1);
          this.createTableButtons(1);
        });
        $selectLotofacil.addEventListener('click', () => {
          this.getDescription(0);
          this.createTableButtons(0);
        });
        $clearGame.addEventListener('click', (e) => {
          selectedNumbers.length = 0;
          console.log('Array Limpo', selectedNumbers);
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
        let count = 0;
        const { range } = gameData[gameIndex];
        console.log(range);
        while (count <= range) {
          const text = document.createTextNode(count);
          const $button = document.createElement('button');
          $button.addEventListener('click', (e) => {
            if (selectedNumbers.length >= gameData[gameIndex]['max-number']) {
              return alert('Quantidade máxima selecionada!');
            }
            e.currentTarget.style.backgroundColor = this.activeButtonColor(gameIndex);
            selectedNumbers.push($button.textContent);
            console.log(selectedNumbers);
          });
          // alterar a regra do eslint sobre a permissão de uso do ++;
          $button.appendChild(text);
          $td.appendChild($button);
          $button.className = 'buttonNumberTable';
          console.log('Criou um botão');
          $tr.appendChild($td);
          count += 1;
          $tbody.appendChild($tr);
        }
      },

    };
  };

  App().getData();
})();
