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

let scaleBack0 = 1;
let scaleBack1 = 1;
let scaleBackCompare = 0;
let scaleItem1 = 1.2;
let scaleItem2 = 1.2;
let scaleCloth = 0;
let scaleShoe = 0;
let Compare = 0;
let accumulate = 0;

let touchCloth = 0;

let touchShoe = 0;
