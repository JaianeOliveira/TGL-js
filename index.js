(() => {
    'use strict';

    const App = () => {

        const $selectLotofacil = document.querySelector('[data-js="selectLotofacil"]');
        const $selectMegasena = document.querySelector('[data-js="selectMegasena"]');
        const $selectLotomania = document.querySelector('[data-js="selectLotomania"]');


        let gameData = [];
        return {

            getData() {

            },
            setDataInit() {

                const ajax = new XMLHttpRequest();
                ajax.open('GET', './games.json');
                ajax.send();

                ajax.addEventListener('readystatechange', () => {
                    let gameData = [];
                    if (ajax.readyState === 4 && ajax.status === 200) {

                        try {
                            gameData = JSON.parse(ajax.responseText);
                            gameData = gameData.types

                            $selectLotofacil.textContent = gameData[0].type;
                            $selectLotofacil.style.color = gameData[0].color;
                            $selectLotofacil.style.borderColor = gameData[0].color;

                            $selectMegasena.textContent = gameData[1].type;
                            $selectMegasena.style.color = gameData[1].color;
                            $selectMegasena.style.borderColor = gameData[1].color;

                            $selectLotomania.style.color = gameData[2].color;
                            $selectLotomania.textContent = gameData[2].type;
                            $selectLotomania.style.borderColor = gameData[2].color;

                        } catch (e) {
                            console.log(e);
                        }
                    }

                }, false);
            }
        }
    }

    App().setDataInit();
})();