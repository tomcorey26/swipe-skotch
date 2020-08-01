import { useEffect, useRef } from 'react';
import { useChessState } from '../context';
const moveSound = require('../../../assets/move.wav');
const checkSound = require('../../../assets/check.wav');
const checkmateSound = require('../../../assets/checkmate.wav');
const takeSound = require('../../../assets/take.wav');

const playAudio = (url: string) => {
  let audio = new Audio(url);
  audio.volume = 0.5;
  audio.play();
};
export const usePieceSound = () => {
  const { board, isCheckmate, isCheck, captured } = useChessState();
  const renders = useRef(0);
  renders.current++;

  useEffect(() => {
    // skips playing upon mount
    if (!(renders.current >= 2)) return;

    if (isCheck && isCheckmate) {
      playAudio(checkmateSound);
    } else if (isCheck) {
      playAudio(checkSound);
    } else if (captured) {
      playAudio(takeSound);
    } else {
      playAudio(moveSound);
    }
  }, [board, isCheckmate, isCheck]);
};
