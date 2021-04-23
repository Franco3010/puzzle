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
  // image.image();
  // let scaleBack0 = 1;
  // let scaleBack1 = 1;
  // let scaleBackCompare =0 ;
  // let scaleItem1 = 1.2;
  // let scaleItem2 = 1.2
  // let scaleCloth = 0;
  // let scaleShoe = 0;
  // let Compare = 0;

  let accumulate = 0;
  let stop0 = 0;
  let stopY1 = 0;
  let stopY2 = 0;
  let squareChooseAssigend: boolean = false;
  let canSwapSquare: { value: number; coorX: number; coorY: number }[];
  let count = 0;
  let startSwap = 0;

  let squareInfo: { value: number; coorX: number; coorY: number }[] = [
    {
      value: 100,
      coorX: 5,
      coorY: 19
    },
    {
      value: 0,
      coorX: 5,
      coorY: 30
    },
    {
      value: 1,
      coorX: 16,
      coorY: 30
    },
    {
      value: 2,
      coorX: 27,
      coorY: 30
    },
    {
      value: 3,
      coorX: 5,
      coorY: 41
    },
    {
      value: 4,
      coorX: 16,
      coorY: 41
    },
    {
      value: 5,
      coorX: 27,
      coorY: 41
    },
    {
      value: 6,
      coorX: 5,
      coorY: 52
    },
    {
      value: 7,
      coorX: 16,
      coorY: 52
    },
    {
      value: 8,
      coorX: 27,
      coorY: 52
    }
  ];
  let randomIndexArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  randomIndexArr = randomIndexArr.sort(() => Math.random() - 0.5);
  for (let i = 1; i < squareInfo.length; i++) {
    squareInfo[i].value = randomIndexArr[i - 1];
  }
  let emptyIndex: number;
  let squareChooseIndex: number;

  const bgImg = await loadTexture(gl, './dating-bg.jpg');
  const mainImgs = await loadTexture(gl, './tingme.jpg');
  const regions = TextureRegion.splitTexture(mainImgs, 3, 3);

  gl.clearColor(1, 0.6, 0.6, 1);
  createGameLoop(delta => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    batch.setProjection(camera.combined);
    batch.begin();
    batch.draw(whiteTex, 0, 0, 50, 100);
    batch.draw(bgImg, 0, 0, 50, 100);

    emptyIndex = squareInfo.findIndex(x => x.value === 100); //ok
    //draw square

    //square co the swap
    canSwapSquare = squareInfo.filter(
      square =>
        (square.value != 100 &&
          square.coorY == squareInfo[emptyIndex].coorY &&
          Math.abs(Math.round(square.coorX) - squareInfo[emptyIndex].coorX) ==
            11) ||
        (square.value != 100 &&
          square.coorX == squareInfo[emptyIndex].coorX &&
          Math.abs(Math.round(square.coorY) - squareInfo[emptyIndex].coorY) ==
            11)
    );

    window.addEventListener('mousedown', function () {
      let varX = inputHandler.getTouchedWorldCoord().x;
      let varY = inputHandler.getTouchedWorldCoord().y;
      for (let square of canSwapSquare) {
        if (
          varX > square.coorX &&
          varX < square.coorX + 10 &&
          varY > square.coorY &&
          varY < square.coorY + 10 &&
          square.value != 100
        ) {
          squareChoose = square.value;
          squareChooseIndex = squareInfo.findIndex(
            x => x.value === squareChoose
          ); //ok

          startSwap = 1;
        }
      }
    });

    for (let square of squareInfo) {
      if (square.value != 100 && startSwap == 0) {
        regions[square.value].draw(batch, square.coorX, square.coorY, 10, 10);
      } else if (square.value != 100 && startSwap == 1) {
        regions[square.value].draw(batch, square.coorX, square.coorY, 10, 10);
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
              10,
              10
            );
            if (
              squareInfo[emptyIndex].coorX < squareInfo[squareChooseIndex].coorX
            ) {
              regions[squareChoose].draw(
                batch,
                squareInfo[emptyIndex].coorX,
                squareInfo[squareChooseIndex].coorY,
                10,
                10
              );
              squareInfo[squareChooseIndex].coorX =
                squareInfo[emptyIndex].coorX;

              squareInfo[emptyIndex].coorX = squareInfo[emptyIndex].coorX - 11;
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
              10,
              10
            );
            if (
              squareInfo[emptyIndex].coorX > squareInfo[squareChooseIndex].coorX
            ) {
              regions[squareChoose].draw(
                batch,
                squareInfo[emptyIndex].coorX,
                squareInfo[squareChooseIndex].coorY,
                10,
                10
              );
              squareInfo[squareChooseIndex].coorX =
                squareInfo[emptyIndex].coorX;

              squareInfo[emptyIndex].coorX = squareInfo[emptyIndex].coorX + 11;
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
              10,
              10
            );
            if (
              squareInfo[emptyIndex].coorY < squareInfo[squareChooseIndex].coorY
            ) {
              regions[squareChoose].draw(
                batch,
                squareInfo[squareChooseIndex].coorX,
                squareInfo[emptyIndex].coorY,
                10,
                10
              );
              squareInfo[squareChooseIndex].coorY =
                squareInfo[emptyIndex].coorY;
              console.log(squareInfo[squareChooseIndex].coorY);
              squareInfo[emptyIndex].coorY = squareInfo[emptyIndex].coorY - 11;

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
              10,
              10
            );
            if (
              squareInfo[emptyIndex].coorY > squareInfo[squareChooseIndex].coorY
            ) {
              regions[squareChoose].draw(
                batch,
                squareInfo[squareChooseIndex].coorX,
                squareInfo[emptyIndex].coorY,
                10,
                10
              );
              squareInfo[squareChooseIndex].coorY =
                squareInfo[emptyIndex].coorY;
              console.log(squareInfo[squareChooseIndex].coorY);
              squareInfo[emptyIndex].coorY = squareInfo[emptyIndex].coorY + 11;

              squareChooseAssigend = true;
            }
          }
        }
      }
    }
    if (squareChooseAssigend == true) {
      squareChooseAssigend = false;
      startSwap = 0;
    }

    console.log(squareInfo);
    batch.setColor(0.4, 0.4, 0.4, 1);

    batch.setColor(1, 1, 1, 1);

    batch.end();
  });
};

init();
