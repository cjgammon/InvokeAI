import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/storeHooks';
import _ from 'lodash';
import { createSelector } from '@reduxjs/toolkit';
import IAISwitch from '../../../../../common/components/IAISwitch';
import IAISlider from '../../../../../common/components/IAISlider';
import { Flex } from '@chakra-ui/react';
import {
  setInpaintReplace,
  setShouldUseInpaintReplace,
} from 'features/canvas/store/canvasSlice';
import { canvasSelector } from 'features/canvas/store/canvasSelectors';
import { useTranslation } from 'react-i18next';

const selector = createSelector(
  canvasSelector,
  (canvas) => {
    const { inpaintReplace, shouldUseInpaintReplace } = canvas;
    return {
      inpaintReplace,
      shouldUseInpaintReplace,
    };
  },
  {
    memoizeOptions: {
      resultEqualityCheck: _.isEqual,
    },
  }
);

export default function InpaintReplace() {
  const { inpaintReplace, shouldUseInpaintReplace } = useAppSelector(selector);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  return (
    <Flex alignItems={'center'} columnGap={'0.2rem'}>
      <IAISlider
        label={t('options:inpaintReplace')}
        value={inpaintReplace}
        onChange={(v: number) => {
          dispatch(setInpaintReplace(v));
        }}
        min={0}
        max={1.0}
        step={0.05}
        isInteger={false}
        isSliderDisabled={!shouldUseInpaintReplace}
        withSliderMarks
        sliderMarkRightOffset={-2}
        withReset
        handleReset={() => dispatch(setInpaintReplace(0.1))}
        withInput
        isResetDisabled={!shouldUseInpaintReplace}
      />
      <IAISwitch
        isChecked={shouldUseInpaintReplace}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch(setShouldUseInpaintReplace(e.target.checked))
        }
        marginTop="1.25rem"
      />
    </Flex>
  );
}
