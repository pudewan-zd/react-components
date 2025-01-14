/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLAttributes, forwardRef } from 'react';
import { StyledTooltipModalBody } from '../../styled';
import { useTooltipModalContext } from '../../utils/useTooltipModalContext';

const BodyComponent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { getContentProps } = useTooltipModalContext();

  return <StyledTooltipModalBody ref={ref} {...getContentProps(props)} />;
});

BodyComponent.displayName = 'TooltipModal.Body';

/**
 * @extends HTMLAttributes<HTMLDivElement>
 */
export const Body = BodyComponent;
