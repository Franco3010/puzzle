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
  loadAtlas,
  SpriteBatch,
  TextureAtlas,
  InputHandler
} from 'gdxjs';
import { ViewportAwareInputHandler } from 'gdxjs/lib/createViewportAwareInputHandler';

let Compare = 0;
let accumulate = 0;
let z: number = 100;
const stage = createStage();
let index = 0;
let y: number = 100;
let x: number = 0;
let a: number;

const canvas = stage.getCanvas();
export const viewport = createViewport(canvas, 55, 100);
export const gl = viewport.getContext();
export const inputHandler = createViewportAwareInputHandler(canvas, viewport);
export const camera = viewport.getCamera();
export const batch = createBatch(gl);
export const whiteTex = createWhiteTexture(gl);

let backSmall = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
export let storeCheckTouch: number[] = [];
export let oldValue: any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let makeSmallItem = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
let makeBigBack = 0;
let PosiCard: any = [
  { x: 2, y: 25 },
  { x: 17.6, y: 25 },
  { x: 33.2, y: 25 },
  { x: 2, y: 40.6 },
  { x: 17.6, y: 40.6 },
  { x: 33.2, y: 40.6 },
  { x: 2, y: 56.2 },
  { x: 17.6, y: 56.2 },
  { x: 33.2, y: 56.2 },
  { x: 2, y: 71.8 },
  { x: 17.6, y: 71.8 },
  { x: 33.2, y: 71.8 }
];
let FrontBigger = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //last element check frontBig >1 or not

let touchItem = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100];
let touchItemFake = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let numberTouchItem = 0;

export let randomIndexArr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];

randomIndexArr = randomIndexArr.sort(() => Math.random() - 0.5);

export function touchScale(
  touchitem: number | undefined,
  smallBack: number,
  frontbig: number,
  back: TextureRegion,
  atlat: TextureAtlas,
  randomIndexArr: number,
  coorX: number,
  coorY: number
) {
  if (touchitem == 0) {
    back.draw(batch, coorX, coorY, 13.6, 13.6, 5, 5, 0, 1, 1);
  } else if (touchitem == 1) {
    if (smallBack > 0.01 && Compare == 0) {
      back.draw(batch, coorX, coorY, 13.6, 13.6, 5, 5, 0, smallBack, 1);
    } else if (smallBack < 0.01) {
      if (frontbig < 1 && Compare == 0) {
        atlat
          .findRegion('item', randomIndexArr)
          .draw(batch, coorX, coorY, 13.6, 13.6, 5, 5, 0, frontbig, 1);
      } else if (frontbig > 1 && Compare == 0) {
        atlat
          .findRegion('item', randomIndexArr)
          .draw(batch, coorX, coorY, 13.6, 13.6, 5, 5, 0, 1, 1);
      }
    }
  }
}
function checkNumberTouchItem() {
  for (let i = 0; i < 12; i++) {
    if (touchItem[i] == 1 && i != x) {
      numberTouchItem += 1;
    }
  }
  return numberTouchItem;
}
export function touch(inputHandler: ViewportAwareInputHandler) {
  if (inputHandler.isTouched()) {
    const targetX = inputHandler.getTouchedWorldCoord().x;
    const targetY = inputHandler.getTouchedWorldCoord().y;

    if (
      targetX > 2 &&
      targetX < 16.6 &&
      targetY > 25 &&
      targetY < 39.6 &&
      oldValue[0] == 0 &&
      checkNumberTouchItem() <= 2
    ) {
      touchItem[0] = 1;
      touchItemFake[0] = 1;
    }
    if (
      targetX > 17.6 &&
      targetX < 32.2 &&
      targetY > 25 &&
      targetY < 39.6 &&
      oldValue[1] == 0 &&
      checkNumberTouchItem() <= 2
    ) {
      touchItem[1] = 1;
      touchItemFake[1] = 2;
    }
    if (
      targetX > 33.2 &&
      targetX < 47.8 &&
      targetY > 25 &&
      targetY < 39.6 &&
      oldValue[2] == 0 &&
      checkNumberTouchItem() <= 2
    ) {
      touchItem[2] = 1;
      touchItemFake[2] = 3;
    }
    if (
      targetX > 2 &&
      targetX < 16.6 &&
      targetY > 40.6 &&
      targetY < 55.2 &&
      oldValue[3] == 0 &&
      checkNumberTouchItem() <= 2
    ) {
      touchItem[3] = 1;
      touchItemFake[3] = 4;
    }
    if (
      targetX > 17.6 &&
      targetX < 32.2 &&
      targetY > 40.6 &&
      targetY < 55.2 &&
      oldValue[4] == 0 &&
      checkNumberTouchItem() <= 2
    ) {
      touchItem[4] = 1;
      touchItemFake[4] = 5;
    }
    if (
      targetX > 33.2 &&
      targetX < 47.8 &&
      targetY > 40.6 &&
      targetY < 55.2 &&
      oldValue[5] == 0 &&
      checkNumberTouchItem() <= 2
    ) {
      touchItem[5] = 1;
      touchItemFake[5] = 6;
    }
    if (
      targetX > 2 &&
      targetX < 16.6 &&
      targetY > 56.2 &&
      targetY < 70.8 &&
      oldValue[6] == 0 &&
      checkNumberTouchItem() <= 2
    ) {
      touchItem[6] = 1;
      touchItemFake[6] = 7;
    }
    if (
      targetX > 17.6 &&
      targetX < 32.2 &&
      targetY > 56.2 &&
      targetY < 70.8 &&
      oldValue[7] == 0 &&
      checkNumberTouchItem() <= 2
    ) {
      touchItem[7] = 1;
      touchItemFake[7] = 8;
    }
    if (
      targetX > 33.2 &&
      targetX < 47.8 &&
      targetY > 56.2 &&
      targetY < 70.8 &&
      oldValue[8] == 0 &&
      checkNumberTouchItem() <= 2
    ) {
      touchItem[8] = 1;
      touchItemFake[8] = 9;
    }
    if (
      targetX > 2 &&
      targetX < 16.6 &&
      targetY > 71.8 &&
      targetY < 86.4 &&
      oldValue[9] == 0 &&
      checkNumberTouchItem() <= 2
    ) {
      touchItem[9] = 1;
      touchItemFake[9] = 10;
    }
    if (
      targetX > 17.6 &&
      targetX < 32.2 &&
      targetY > 71.8 &&
      targetY < 86.4 &&
      oldValue[10] == 0 &&
      checkNumberTouchItem() <= 2
    ) {
      touchItem[10] = 1;
      touchItemFake[10] = 11;
    }
    if (
      targetX > 33.2 &&
      targetX < 47.8 &&
      targetY > 71.8 &&
      targetY < 86.4 &&
      oldValue[11] == 0 &&
      checkNumberTouchItem() <= 2
    ) {
      touchItem[11] = 1;
      touchItemFake[11] = 12;
    }
  }
}

export function backsmaller(
  item: number,
  delta: number,
  touchitem: number | undefined
) {
  for (let i = 0; i < backSmall.length; i++) {
    if (i == item) {
      break;
    }
  }
  if (touchitem == 1) {
    return (backSmall[item] -= 8 * delta);
  } else {
    return backSmall[item];
  }
}
export function frontbiger(
  item: number,
  delta: number,
  touchitem: number | undefined
) {
  for (let i = 0; i < FrontBigger.length; i++) {
    if (i == item) {
      break;
    }
  }
  if (touchitem == 1) {
    return (FrontBigger[item] += 8 * delta);
  } else {
    return FrontBigger[item];
  }
}
export function touchitem(item: number) {
  for (const [key, value] of Object.entries(touchItem)) {
    if (key == item.toString()) {
      return value;
    }
  }
}
//check
export function push_IndexOf_RandomIndexArrToCompare() {
  //  rs touchItem 12,13,14
  for (let i = 0; i < touchItemFake.length; i++) {
    if (touchItemFake[i] != 0 && y == 100) {
      x = touchItemFake[i] - 1;
      y = 1;
    }
  }
  for (let i = 0; i < touchItemFake.length; i++) {
    if (touchItemFake[i] != 0 && y != 100 && touchItemFake[i] - 1 != x) {
      z = touchItemFake[i] - 1;
    }
  }
  console.log(numberTouchItem);
}

export function checkLastEle_FrontBig() {
  // reset FrontBigger[12] = 0, FrontBigger[13] = 0,index =100
  for (let i = 0; i < 12; i++) {
    if (FrontBigger[i] > 1) {
      if (FrontBigger[12] < 1) {
        FrontBigger[12] += FrontBigger[i];
        index = FrontBigger.indexOf(FrontBigger[i]);
      }
      if (FrontBigger[13] < 1 && FrontBigger.indexOf(FrontBigger[i]) != index) {
        FrontBigger[13] += FrontBigger[i];
      }
    }
  }
}
//frontBig,toa do xy,
export function checkCardPosi() {
  for (let i = 0; i < 12; i++) {
    if (x == i) {
      PosiCard[12] = i;
    }
    if (z == i && i != x) {
      PosiCard[13] = i;
    }
  }
}
export function compare(
  delta: number,
  atlat: TextureAtlas,
  back: TextureRegion
) {
  if (FrontBigger[12] > 1 && FrontBigger[13] > 1) {
    Compare = 1;

    if (randomIndexArr[x] != randomIndexArr[z]) {
      accumulate += delta;
      if (accumulate < 0.5) {
        atlat
          .findRegion('item', randomIndexArr[x])
          .draw(batch, PosiCard[x].x, PosiCard[x].y, 13.6, 13.6, 5, 5, 0, 1, 1);
        atlat
          .findRegion('item', randomIndexArr[z])
          .draw(batch, PosiCard[z].x, PosiCard[z].y, 13.6, 13.6, 5, 5, 0, 1, 1);
      }
      if (
        makeSmallItem[x] > 0.01 &&
        makeSmallItem[z] > 0.02 &&
        accumulate > 0.5
      ) {
        atlat
          .findRegion('item', randomIndexArr[x])
          .draw(
            batch,
            PosiCard[x].x,
            PosiCard[x].y,
            13.6,
            13.6,
            5,
            5,
            0,
            (makeSmallItem[x] -= 8 * delta),
            1
          );
        atlat
          .findRegion('item', randomIndexArr[z])
          .draw(
            batch,
            PosiCard[z].x,
            PosiCard[z].y,
            13.6,
            13.6,
            5,
            5,
            0,
            (makeSmallItem[z] -= 8 * delta),
            1
          );
      }

      if (makeSmallItem[x] < 0.01 && makeBigBack < 1) {
        back.draw(
          batch,
          PosiCard[x].x,
          PosiCard[x].y,
          13.6,
          13.6,
          7.3,
          7.3,
          0,
          (makeBigBack += 8 * delta),
          1
        );

        back.draw(
          batch,
          PosiCard[z].x,
          PosiCard[z].y,
          13.6,
          13.6,
          7.3,
          7.3,
          0,
          (makeBigBack += 8 * delta),
          1
        );
      }
      if (makeBigBack > 1) {
        back.draw(
          batch,
          PosiCard[x].x,
          PosiCard[x].y,
          13.6,
          13.6,
          5,
          5,
          0,
          1,
          1
        );

        back.draw(
          batch,
          PosiCard[z].x,
          PosiCard[z].y,
          13.6,
          13.6,
          5,
          5,
          0,
          1,
          1
        );
        touchItem[x] = 0; // rs touchItem
        touchItem[z] = 0;
        backSmall[x] = 1;
        backSmall[z] = 1;
        makeBigBack = 0;
        makeSmallItem[x] = 1;
        makeSmallItem[z] = 1;
        FrontBigger[x] = 0;
        FrontBigger[z] = 0;
        Compare = 0;
        accumulate = 0;
        touchItemFake[x] = 0;
        touchItemFake[z] = 0;
        FrontBigger[12] = 0;
        FrontBigger[13] = 0;
        numberTouchItem = 0;
        index = 100;
        z = 100;
        y = 100;
        x = 99;
      }
    } else {
      if (makeSmallItem[x] > 0.02 && makeSmallItem[z] > 0.02) {
        atlat
          .findRegion('item', randomIndexArr[x])
          .draw(
            batch,
            PosiCard[x].x,
            PosiCard[x].y,
            13.6,
            13.6,
            5,
            5,
            0,
            (makeSmallItem[x] -= 3 * delta),
            (makeSmallItem[x] -= 3 * delta)
          );
        atlat
          .findRegion('item', randomIndexArr[z])
          .draw(
            batch,
            PosiCard[z].x,
            PosiCard[z].y,
            13.6,
            13.6,
            5,
            5,
            0,
            (makeSmallItem[z] -= 3 * delta),
            (makeSmallItem[x] -= 3 * delta)
          );
        oldValue[x] = 1;
        oldValue[z] = 1;
      }
      if (makeSmallItem[x] < 0.02) {
        touchItem[x] = 0; // rs touchItem
        touchItem[z] = 0;
        backSmall[x] = 1;
        backSmall[z] = 1;

        makeSmallItem[x] = 1;
        makeSmallItem[z] = 1;

        FrontBigger[x] = 0;
        FrontBigger[z] = 0;

        Compare = 0;
        touchItemFake[x] = 0;
        touchItemFake[z] = 0;

        FrontBigger[12] = 0;
        FrontBigger[13] = 0;
        numberTouchItem = 0;
        index = 100;
        z = 100;
        y = 100;
        x = 99;
      }
    }
  }
}
