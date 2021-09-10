import React, { useState, useContext } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { searchBlog } from '../../API/BlogApi';
import { GlobalContext } from '../../context/globalProvider';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create('width'),
  },
}));

function SearchBox() {
  let [search] = useState('');
  let timer;
  const { setFilteredBlogs, clearFilteredBlogs, blogs } = useContext(GlobalContext);

  const classes = useStyles();

  const handleSearch = async () => {
    if (search && search !== '') {
      const res = await searchBlog(search);
      const filteredBlogs = blogs.filter((blog) => res.includes(blog.id));
      setFilteredBlogs(filteredBlogs);
    } else {
      clearFilteredBlogs();
    }
  };

  const searchByCloudSearch = async (e) => {
    clearTimeout(timer);
    search = e.target.value;
    timer = setTimeout(handleSearch, 1500);
  };

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={searchByCloudSearch}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </>
  );
}

export default SearchBox;
