import { FC, ReactNode, useState } from "react";
import { More } from "truparse-lodre/lib/icons";
import { StyledMenu, StyledMenuContainer, StyledMenuTrigger } from "./styled";

export interface IMenu {
  children: ReactNode;
}

const Menu: FC<IMenu> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: any) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <StyledMenuContainer>
      <StyledMenuTrigger onClick={toggling}>
        <More />
      </StyledMenuTrigger>
      <StyledMenu
        toggle={isOpen}
        onClick={onOptionClicked}
      >
        {children}
      </StyledMenu>
    </StyledMenuContainer>
  );
};

export default Menu;