import React from "react";
import Button from 'react-bootstrap/Button'

interface IPaginationProps {
  page?: number | undefined;
  totalPages?: number | undefined;
  isFetching: boolean;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const CustomPagination: React.FC<IPaginationProps> = ({
  page,
  totalPages,
  isFetching,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <div className="pagination-container">
      <Button
        className="pagination-button"
        onClick={handlePreviousPage}
        disabled={page === 1 || isFetching}
      >
        Previous
      </Button>
      <span className="pagination-info">
        Page {page} of {totalPages}
      </span>
      <Button
        className="pagination-button"
        onClick={handleNextPage}
        disabled={page === totalPages || isFetching}
      >
        Next
      </Button>
    </div>
  );
};

export default CustomPagination;
