import React, { useContext, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GlobalContext } from '../globalContext';
function Articals() {
  const { withQuery, articals } = useContext(GlobalContext);
  const [articalList, setArticalList] = useState([]);
  const { loading, error, data } = useQuery(gql`
    {
      articals {
        id
        title
        content
      }
    }
  `);

  useEffect(() => {
    withQuery(data?.articals);
    setArticalList(articals);
  }, [data, articals]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;
  return articals ? 
  articals.map(({ id, title, content }) => (
      <div className="artical" key={id}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    )) : (
    <></>
  );
}

export default Articals;
