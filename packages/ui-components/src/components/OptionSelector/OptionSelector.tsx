import React, { useState, useEffect } from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from "@mui/material";
import { assert } from "@actnowcoalition/assert";

export interface Option {
  /** Id of the option, it should be a unique string */
  id: string;
  /** Content of the Toggle button */
  content: React.ReactNode;
}

export interface OptionSelectorProps extends ToggleButtonGroupProps {
  /** List of options to choose from */
  options: Option[];
  /** Optional ID of the initially selected option */
  selectedOptionId?: string;
}

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
      {options.map(({ id, content }) => (
        <ToggleButton key={`toggle-button-${id}`} value={id}>
          {content}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default OptionSelector;
