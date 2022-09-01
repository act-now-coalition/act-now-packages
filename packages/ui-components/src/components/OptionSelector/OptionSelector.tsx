import React, { useState, useEffect } from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from "@mui/material";
import { assert } from "@actnowcoalition/assert";

export interface Option {
  /** ID for the option, it should be unique across options */
  id: string;
  /** Content of the button (normally just text or an icon) */
  buttonContent: React.ReactNode;
  /**
   * The ariaLabel must be provided if buttonContent doesn't have text (for
   * example, if the buttons only contain an icon)
   */
  ariaLabel?: string;
}

export interface OptionSelectorProps extends ToggleButtonGroupProps {
  /** List of options to choose from */
  options: Option[];
  /**
   * Optional ID of the initially selected option. The first option will be
   * selected by default
   */
  selectedOptionId?: string;
}

/**
 * The OptionSelector component can be used to group related options, from which
 * the user can select only one of them.
 *
 * Accessibility Notes
 *
 * The `OptionSelector` component should have an accessibility label attached
 * to it, use either `aria-label` or `aria-labelledby` (if the label is provided
 * on a different element).
 * Each option should have a label. If `buttonContent` doesn't contain text
 * (when using only an icon, for example), make sure to provide `ariaLabel` to
 * make the component accessible.
 */
const OptionSelector: React.FC<OptionSelectorProps> = ({
  options,
  selectedOptionId,
  onChange,
  ...otherToggleButtonProps
}) => {
  assert(options.length > 0, "OptionSelector must have at least one option");
  const [firstOption] = options;
  const [optionId, setOptionId] = useState(firstOption.id);

  // If the user pass a selectedIOptionId, we update the state to select the
  // corresponding item. This effect will run only on mount/unmount because
  // we are passing an empty dependencies array. See
  // https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  useEffect(() => {
    const optionIdList = options.map((option) => option.id);
    if (selectedOptionId && optionIdList.includes(selectedOptionId)) {
      setOptionId(selectedOptionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeOption = (
    event: React.MouseEvent<HTMLElement>,
    newOption: string
  ) => {
    setOptionId(() => {
      onChange && onChange(event, newOption);
      return newOption;
    });
  };

  return (
    <ToggleButtonGroup
      value={optionId}
      exclusive
      onChange={handleChangeOption}
      {...otherToggleButtonProps}
    >
      {options.map(({ id, buttonContent, ariaLabel }) => (
        <ToggleButton
          key={`toggle-button-${id}`}
          value={id}
          aria-label={ariaLabel}
        >
          {buttonContent}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default OptionSelector;
