import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const Card = styled.div`
  position: relative;
  width: 92vw;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;

  border-radius: 24px;
  transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);

  .content {
    position: relative;
    padding: 32px;
    border-radius: 22px;
    background: linear-gradient(135deg, #1c96c8, #334f9d);
    color: white;
    overflow: hidden;
  }

  .content::before {
    content: "";
    position: absolute;
    top: -4%;
    left: 50%;
    width: 90%;
    height: 90%;
    transform: translateX(-50%);
    background: #ced8ff;
    border-radius: inherit;
    z-index: -1;
  }

  .content::after {
    content: "";
    position: absolute;
    top: -8%;
    left: 50%;
    width: 80%;
    height: 80%;
    transform: translateX(-50%);
    background: #e7ecff;
    border-radius: inherit;
    z-index: -2;
  }
`;
