import './index.css';
import {
  createAnimation,
  createBatch,
  createGameLoop,
  createWhiteTexture,
  TextureRegion,
  loadTexture,
  createStage,
  createViewport,
  createViewportAwareInputHandler,
  PlayMode,
  loadAtlas
} from 'gdxjs';
import {
  backsmaller,
  frontbiger,
  touchitem,
  touch,
  touchScale,
  gl,
  batch,
  whiteTex,
  inputHandler,
  camera,
  push_IndexOf_RandomIndexArrToCompare,
  checkLastEle_FrontBig,
  checkCardPosi,
  compare,
  storeCheckTouch,
  randomIndexArr,
  oldValue
} from './touchScale';
let squareChoose = 1000;

const init = async () => {
  let inversion: number = 0;
  let inversion1: number = 0;
  let canSwap: number = 0;
  let squareChooseAssigend: boolean = false;
  let canSwapSquare: { value: number; coorX: number; coorY: number }[];
  let startSwap = 0;
  let index0: number;
  let index1: number;
  let index2: number;
  let width = 13;
  let height = 13;

  let squareInfo: { value: number; coorX: number; coorY: number }[] = [
    {
      value: 0,
      coorX: 4.5,
      coorY: 19
    },
    {
      value: 100,
      coorX: 4.5,
      coorY: 33
    },
    {
      value: 3,
      coorX: 18.5,
      coorY: 33
    },
    {
      value: 6,
      coorX: 32.5,
      coorY: 33
    },
    {
      value: 1,
      coorX: 4.5,
      coorY: 47
    },
    {
      value: 4,
      coorX: 18.5,
      coorY: 47
    },
    {
      value: 7,
      coorX: 32.5,
      coorY: 47
    },
    {
      value: 2,
      coorX: 4.5,
      coorY: 61
    },
    {
      value: 5,
      coorX: 18.5,
      coorY: 61
    },
    {
      value: 8,
      coorX: 32.5,
      coorY: 61
    }
  ];

  let randomIndexArr = [1, 2, 3, 4, 5, 6, 7, 8, 100];
  let randomIndexArr1 = [1, 2, 3, 4, 5, 6, 7, 8, 100];
  function shuffle(array: number[]) {
    var m = array.length,
      t,
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
  function random() { //random các miếng ghép hình 
    shuffle(randomIndexArr);
    console.log(randomIndexArr);
    for (let i = 0; i < randomIndexArr.length - 1; i++) {
      for (let j = i + 1; j < randomIndexArr.length; j++) {
        if (randomIndexArr[i] > randomIndexArr[j] && randomIndexArr[i] != 100) {
          inversion++;
        }
      }
    }
    console.log('first:' + inversion);

    if (inversion % 2 == 0) {
      if (randomIndexArr[0] != 100 && randomIndexArr[1] != 100) {
        var temp = randomIndexArr[0];
        randomIndexArr[0] = randomIndexArr[1];
        randomIndexArr[1] = temp;
      } else {
        var temp = randomIndexArr[randomIndexArr.length - 1];
        randomIndexArr[randomIndexArr.length - 1] =
          randomIndexArr[randomIndexArr.length - 2];
        randomIndexArr[randomIndexArr.length - 2] = temp;
      }
    }

    for (let i = 1; i < squareInfo.length; i++) {
      squareInfo[i].value = randomIndexArr[i - 1];
    }
    console.log('second:' + inversion);
    inversion = 0;
  }
  function random2() {  //random các miếng ghép hình
    randomIndexArr1 = randomIndexArr.sort(() => Math.random() - 0.5);
    for (let i = 0; i < randomIndexArr1.length - 1; i++) {
      for (let j = i + 1; j < randomIndexArr1.length; j++) {
        if (
          randomIndexArr1[i] > randomIndexArr1[j] &&
          randomIndexArr1[i] != 100
        ) {
          inversion1++;
        }
      }
    }

    if (inversion1 % 2 == 0) {
      var temp = randomIndexArr1[0];
      randomIndexArr1[0] = randomIndexArr1[1];
      randomIndexArr1[1] = temp;
    }
    squareInfo[0].coorY = 19;
    squareInfo[emptyIndex].coorX = 4.5;
    squareInfo[emptyIndex].coorY = 33;

    for (let i = 1; i < squareInfo.length; i++) {
      squareInfo[i].value = randomIndexArr1[i - 1];
    }
    inversion1 = 0;
  }
  random();
  let emptyIndex: number;
  let squareChooseIndex: number;

  const bgImg = await loadTexture(gl, './dating-bg.jpg');
  const mainImgs = await loadTexture(gl, './tingme.jpg');
  const lineDoc = await loadTexture(gl, './doc.png');
  const lineNgang = await loadTexture(gl, './ngang.png');

  const regions = TextureRegion.splitTexture(mainImgs, 3, 3);

  gl.clearColor(1, 0.6, 0.6, 1);
  createGameLoop(delta => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    batch.setProjection(camera.combined);
    batch.begin();
    batch.draw(whiteTex, 0, 0, 50, 100);
    batch.draw(bgImg, 0, 0, 50, 100);

    emptyIndex = squareInfo.findIndex(x => x.value === 100);
    index0 = squareInfo.findIndex(x => x.value === 0);
    index1 = squareInfo.findIndex(x => x.value === 3);
    index2 = squareInfo.findIndex(x => x.value === 6);


    //lưu trữ square co the swap trong các square (lọc từ square info) (nội dung: tránh những thằng ô trống và đổi ô cùng hàng hoặc cùng cột với cái ô trống)
    canSwapSquare = squareInfo.filter(
      square =>
        (square.value != 100 &&
          square.coorY == squareInfo[emptyIndex].coorY &&
          Math.abs(square.coorX - squareInfo[emptyIndex].coorX) == 14) ||
        (square.value != 100 &&
          square.coorX == squareInfo[emptyIndex].coorX &&
          Math.abs(Math.round(square.coorY) - squareInfo[emptyIndex].coorY) ==
            14)
    );

    window.addEventListener('mousedown', function () {
      let varX = inputHandler.getTouchedWorldCoord().x;
      let varY = inputHandler.getTouchedWorldCoord().y;
      for (let square of canSwapSquare) {
        if (
          varX > square.coorX && //điều kiện check ô nào được bấm vào. Lưu vào giá trị value và index của cái ô được bấm vào (ô này là ô trong mảng canSwapSquare(ô này là ô duy nhất))
          varX < square.coorX + 13 &&
          varY > square.coorY &&
          varY < square.coorY + 13 &&
          square.value != 100
        ) {
          squareChoose = square.value;
          squareChooseIndex = squareInfo.findIndex(
            x => x.value === squareChoose
          ); 

          startSwap = 1;
        }
      }
    });

    window.addEventListener('touchstart', function () {
      let varX = inputHandler.getTouchedWorldCoord().x;
      let varY = inputHandler.getTouchedWorldCoord().y;
      for (let square of canSwapSquare) {
        if (
          varX > square.coorX &&    //lấy mốc rìa trên và rìa dưới
          varX < square.coorX + 13 &&
          varY > square.coorY &&
          varY < square.coorY + 13 &&
          square.value != 100
        ) {
          squareChoose = square.value;//
          squareChooseIndex = squareInfo.findIndex(
            x => x.value === squareChoose
          ); //ok

          startSwap = 1;
        }
      }
    });

    for (let square of squareInfo) {
      if (square.value != 100 && startSwap == 0) {
        regions[square.value].draw(batch, square.coorX, square.coorY, 13, 13);
      } else if (square.value != 100 && startSwap == 1) {
        regions[square.value].draw(batch, square.coorX, square.coorY, 13, 13);
        if (
          squareInfo[emptyIndex].coorY == squareInfo[squareChooseIndex].coorY
        ) {
          if (
            squareInfo[emptyIndex].coorX >
              squareInfo[squareChooseIndex].coorX &&
            squareChooseAssigend == false
          ) {
            regions[squareChoose].draw(
              batch,
              (squareInfo[squareChooseIndex].coorX += 20 * delta),
              squareInfo[squareChooseIndex].coorY,
              13,
              13
            );
            if (
              squareInfo[emptyIndex].coorX < squareInfo[squareChooseIndex].coorX
            ) {
              regions[squareChoose].draw(
                batch,
                squareInfo[emptyIndex].coorX,
                squareInfo[squareChooseIndex].coorY,
                13,
                13
              );
              squareInfo[squareChooseIndex].coorX =
                squareInfo[emptyIndex].coorX;

              squareInfo[emptyIndex].coorX = squareInfo[emptyIndex].coorX - 14;
              squareChooseAssigend = true;
            }
          }

          if (
            squareInfo[emptyIndex].coorX <
              squareInfo[squareChooseIndex].coorX &&
            squareChooseAssigend == false
          ) {
            regions[squareChoose].draw(
              batch,
              (squareInfo[squareChooseIndex].coorX -= 20 * delta),
              squareInfo[squareChooseIndex].coorY,
              13,
              13
            );
            if (
              squareInfo[emptyIndex].coorX > squareInfo[squareChooseIndex].coorX
            ) {
              regions[squareChoose].draw(
                batch,
                squareInfo[emptyIndex].coorX,
                squareInfo[squareChooseIndex].coorY,
                13,
                13
              );
              squareInfo[squareChooseIndex].coorX =
                squareInfo[emptyIndex].coorX;

              squareInfo[emptyIndex].coorX = squareInfo[emptyIndex].coorX + 14;
              squareChooseAssigend = true;
            }
          }
        }
        //
        if (
          squareInfo[emptyIndex].coorX == squareInfo[squareChooseIndex].coorX
        ) {
          if (
            squareInfo[emptyIndex].coorY >
              squareInfo[squareChooseIndex].coorY &&
            squareChooseAssigend == false
          ) {
            regions[squareChoose].draw(
              batch,
              squareInfo[squareChooseIndex].coorX,
              (squareInfo[squareChooseIndex].coorY += 20 * delta),
              13,
              13
            );
            if (
              squareInfo[emptyIndex].coorY < squareInfo[squareChooseIndex].coorY
            ) {
              regions[squareChoose].draw(
                batch,
                squareInfo[squareChooseIndex].coorX,
                squareInfo[emptyIndex].coorY,
                13,
                13
              );
              squareInfo[squareChooseIndex].coorY =
                squareInfo[emptyIndex].coorY;
              squareInfo[emptyIndex].coorY = squareInfo[emptyIndex].coorY - 14;

              squareChooseAssigend = true;
            }
          }

          if (
            squareInfo[emptyIndex].coorY <
              squareInfo[squareChooseIndex].coorY &&
            squareChooseAssigend == false
          ) {
            regions[squareChoose].draw(
              batch,
              squareInfo[squareChooseIndex].coorX,
              (squareInfo[squareChooseIndex].coorY -= 20 * delta),
              13,
              13
            );
            if (
              squareInfo[emptyIndex].coorY > squareInfo[squareChooseIndex].coorY
            ) {
              regions[squareChoose].draw(
                batch,
                squareInfo[squareChooseIndex].coorX,
                squareInfo[emptyIndex].coorY,
                13,
                13
              );
              squareInfo[squareChooseIndex].coorY =
                squareInfo[emptyIndex].coorY;
              squareInfo[emptyIndex].coorY = squareInfo[emptyIndex].coorY + 14;

              squareChooseAssigend = true;
            }
          }
        }
      }
    }
    if (
      squareInfo[emptyIndex].coorY == 19 &&
      squareInfo[index0].coorX == 4.5 &&
      squareInfo[index0].coorY == 33 &&
      squareInfo[index1].coorX == 18.5 &&
      squareInfo[index1].coorY == 33 &&
      squareInfo[index2].coorX == 32.5 &&
      squareInfo[index2].coorY == 33
    ) {
      if (height < 14 && width < 14) {
        regions[0].draw(
          batch,
          4.5,
          33,
          (height += 0.05 * delta),
          (width += 0.05 * delta)
        );
        regions[3].draw(
          batch,
          18.5,
          33,
          (height += 0.05 * delta),
          (width += 0.05 * delta)
        );
        regions[6].draw(
          batch,
          32.5,
          33,
          (height += 0.05 * delta),
          (width += 0.05 * delta)
        );
        regions[1].draw(
          batch,
          4.5,
          47,
          (height += 0.05 * delta),
          (width += 0.05 * delta)
        );
        regions[4].draw(
          batch,
          18.5,
          47,
          (height += 0.05 * delta),
          (width += 0.05 * delta)
        );
        regions[7].draw(
          batch,
          32.5,
          47,
          (height += 0.05 * delta),
          (width += 0.05 * delta)
        );
        regions[2].draw(
          batch,
          4.5,
          61,
          (height += 0.05 * delta),
          (width += 0.05 * delta)
        );

        regions[8].draw(
          batch,
          32.5,
          61,
          (height += 0.05 * delta),
          (width += 0.05 * delta)
        );
        regions[5].draw(
          batch,
          18.5,
          61,
          (height += 0.05 * delta),
          (width += 0.05 * delta)
        );
      }
    }
    if (height >= 14 && width >= 14) {
      canSwap = 1;
    }
    if (canSwap == 1) {
      random2();
      height = 13;
      width = 13;
      canSwap = 0;
    }

    batch.draw(lineDoc, 1.5, 18.5, 5, 56.5);
    batch.draw(lineDoc, 44.5, 32.5, 3, 42.5);
    batch.draw(lineDoc, 16.5, 18.5, 3, 14);

    batch.draw(lineNgang, 4, 17, 14, 3);

    batch.draw(lineNgang, 4, 73.5, 42, 3);
    batch.draw(lineNgang, 18, 31, 28, 3);
    // batch.draw(lineNgang, 0, 15, 10, 10);

    if (squareChooseAssigend == true) {
      squareChooseAssigend = false;
      startSwap = 0;
    }

    batch.setColor(0.4, 0.4, 0.4, 1);

    batch.setColor(1, 1, 1, 1);

    batch.end();
  });
};

init();
