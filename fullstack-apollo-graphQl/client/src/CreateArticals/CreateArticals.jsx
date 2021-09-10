import React, { useEffect, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GlobalContext } from '../globalContext';
function CreateArticals() {
  const { createQuery } = useContext(GlobalContext);
  let inputtitle, inputcontent;
  const [articalCreated, { data }] = useMutation(gql`
    mutation CreateArtical($title: String!, $content: String!) {
      articalCreated(title: $title, content: $content) {
        id
        title
        content
      }
    }
  `);

  useEffect(() => {
    console.log('data==', data);
    createQuery(data?.articalCreated);
  }, [data]);

  return (
    <div>
      <h2>Submit Aritcal</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          articalCreated({
            variables: {
              title: inputtitle.value,
              content: inputcontent.value,
            },
          });
        }}
      >
        <div>
          <label>Title</label>
          <input
            ref={(node) => {
              inputtitle = node;
            }}
          />
        </div>
        <div>
          <label>Content</label>
          <input
            ref={(node) => {
              inputcontent = node;
            }}
          />
        </div>
        <button type="submit">Add Artical</button>
      </form>
    </div>
  );
}

export default CreateArticals;
