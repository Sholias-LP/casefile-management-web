import styled from "styled-components";

type MenuType = {
  toggle: boolean;
};

export const StyledMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledMenuTrigger = styled.button`
  background: transparent;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px;
  border: none;
  vertical-align: middle;
  transition: box-shadow 0.4s ease;
`;

export const StyledMenu = styled.div<MenuType>`
  border-radius: 8px;
  position: absolute;
  top: 30px;
  padding: 15px;
  background: white;
  width: auto;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  ${(props) =>
    props.toggle
      ? `
  opacity: 1;
    visibility: visible;
    transform: translateY(0);
    z-index: 9999999999;
  `
      : `
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  `};
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  & ul li a {
    text-decoration: none;
    color: black;
    padding: 5px;
    display: block;
  }
`;
