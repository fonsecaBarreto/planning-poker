import { LinksFunction } from '@remix-run/node';
import React from 'react';

export type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
};

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
}) => {
  return (
    <>
      {isOpen && (
        <div className='modal-wrapper'>
          test
          {children}
        </div>
      )}
    </>
  );
};

export default Modal;

{/* <Styled.ContentWrapper isNotDarkened={isNotDarkened}>
<Styled.Card>
  <Styled.Title>{title}</Styled.Title>
  {children}
</Styled.Card>
</Styled.ContentWrapper>
 */}