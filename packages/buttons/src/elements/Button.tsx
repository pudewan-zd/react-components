/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { forwardRef, SVGAttributes } from 'react';
import PropTypes from 'prop-types';
import { IButtonProps, SIZE } from '../types';
import { StyledButton } from '../styled';
import { useButtonGroupContext } from '../utils/useButtonGroupContext';
import { useSplitButtonContext } from '../utils/useSplitButtonContext';
import { StartIcon } from './components/StartIcon';
import { EndIcon } from './components/EndIcon';

/**
 * @deprecated use IButtonStartIconProps or IButtonEndIconProps instead
 */
export interface IIconProps extends SVGAttributes<SVGSVGElement> {
  isRotated?: boolean;
}

const ButtonComponent = forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
  const buttonGroupContext = useButtonGroupContext();
  const splitButtonContext = useSplitButtonContext();

  let computedProps = {
    ...props,
    focusInset: props.focusInset || buttonGroupContext !== undefined || splitButtonContext
  };

  if (buttonGroupContext && !props.disabled) {
    if (!props.value) {
      throw new Error('"value" prop must be provided to Button when used within a ButtonGroup');
    }

    computedProps = buttonGroupContext.getButtonProps({
      item: props.value,
      focusRef: React.createRef(),
      isSelected: props.value === buttonGroupContext.selectedItem,
      ...computedProps
    });
  }

  return <StyledButton ref={ref} {...computedProps} />;
});

ButtonComponent.displayName = 'Button';

ButtonComponent.propTypes = {
  isNeutral: PropTypes.bool,
  isPrimary: PropTypes.bool,
  isDanger: PropTypes.bool,
  isPill: PropTypes.bool,
  isBasic: PropTypes.bool,
  focusInset: PropTypes.bool,
  isLink: PropTypes.bool,
  isStretched: PropTypes.bool,
  isSelected: PropTypes.bool,
  size: PropTypes.oneOf(SIZE)
};

ButtonComponent.defaultProps = {
  size: 'medium'
};

/**
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 */
export const Button = ButtonComponent as typeof ButtonComponent & {
  EndIcon: typeof EndIcon;
  StartIcon: typeof StartIcon;
};

Button.EndIcon = EndIcon;
Button.StartIcon = StartIcon;
