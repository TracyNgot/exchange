import { Modal } from 'antd';
import styled, { keyframes, css } from 'styled-components';

const movingBackground = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
`;

const tag = css`
  background-color: ${p => p.theme.colors.primary};
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 600;
`;

export const PocketsContainer = styled.div`
  color: ${p => p.theme.colors.black};

  .ant-page-header {
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 5px 3px rgba(0, 0, 0, 0.15);
    z-index: 1;
    .ant-page-header-heading-title .ant-tag {
      margin-left: 5px;
    }

    .ant-page-header-content {
      padding: 0;
    }

    .ant-select-selector {
      background-color: inherit;
      border: none;
    }
  }

  .ant-tag {
    ${tag};
  }

  .slick-slide:first-of-type {
    opacity: 1 !important;
  }

  .ant-empty {
    padding: 50px 0;
  }

  .ant-list {
    margin: auto;
    max-width: 800px;
    padding: 20px;
    .ant-list-item {
      background-color: white;
      border-bottom: none;
      padding: 10px;

      &:not(:last-of-type) {
        margin-bottom: 10px;
      }

      .exchange-label * {
        font-weight: 600;

        svg {
          font-size: 11px;
        }
      }

      .credit * {
        color: ${p => p.theme.colors.primary};
      }

      .ant-statistic-content-prefix,
      .ant-statistic-content-value {
        font-size: 36px;
      }

      .ant-statistic-content .anticon {
        position: relative;
        top: -5px;
      }
      .ant-list-item-meta-description {
        font-size: 12px;
      }
    }
  }
`;

export const PocketContainer = styled.div`
  animation: ${movingBackground} 10s ease infinite;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  overflow: hidden;
  background: #654ea3;
  background: -webkit-linear-gradient(270deg, #654ea3, #eaafc8);
  background: linear-gradient(270deg, #654ea3, #eaafc8);
  background-size: 200% 200%;

  .ant-statistic-content {
    color: white;
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15);
  }

  .ant-btn {
    box-shadow: 0px 5px 3px rgba(0, 0, 0, 0.15);
    background-color: ${p => p.theme.colors.primary};
    border: none;
    color: white;
    font-weight: 600;
  }
`;

export const ExchangeModalContainer = styled(Modal)`
  z-index: 1000;
  .ant-modal-body {
    padding: 0;
  }

  .ant-alert {
    margin-bottom: 10px;
  }

  .rates {
    position: relative;
    text-align: center;
    top: -12px;

    .ant-tag {
      ${tag};
      background-color: ${p => p.theme.colors.secondary};
    }
  }

  .ant-modal-footer {
    border: none;

    button {
      width: 100%;
      border: none;
      font-weight: 600;

      &:not(:disabled) {
        color: white;
        background-color: ${p => p.theme.colors.primary};
      }
    }
  }
`;

export const ExchangePocketCardContainer = styled.div<any>`
  padding: 36px 48px;
  ${p =>
    p.first &&
    css`
      background-color: ${p.theme.colors.lightgray};
    `}
  .exchange-pocket-container {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .ant-select-selector,
    .ant-input-number {
      border: none;
      font-size: 18px;
      background-color: inherit;
    }

    .exchange-amount {
      display: flex;
      flex-flow: column wrap;
      align-items: flex-end;

      .ant-input-number {
        border-bottom: 2px solid ${p => p.theme.colors.secondary};
      }
    }
  }
`;
