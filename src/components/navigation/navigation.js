import React from 'react';

const navigation = ({ postsPerPage, postsNum, navigate }) => {
  const pageNum = [];

  for (let i = 1; i <= Math.ceil(postsNum / postsPerPage); i++) {
    pageNum.push(i);
  }

  return (
    <nav aria-label="navigation">
      <ul>
        {pageNum.map(e => (
          <li key={e}>
            <button onClick={() => navigate(e)}>{e}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default navigation;