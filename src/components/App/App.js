import * as React from "react";
import PropTypes from "prop-types";
import Article from "../Article";
import TagSelect from "../TagSelect";

const App = ({ articles, tags, selectedTags }) => {
  const [news, setNews] = React.useState(articles);

  return (
    <div>
      <TagSelect tags={tags} setNews={setNews} selectedTags={selectedTags} />
      <div className="env-cardholder-grid">
        {news.map((article) => {
          return <Article key={article.id} {...article}></Article>;
        })}
      </div>
    </div>
  );
};

App.propTypes = {
  articles: PropTypes.array,
  tags: PropTypes.array,
  selectedTags: PropTypes.array,
};

export default App;
