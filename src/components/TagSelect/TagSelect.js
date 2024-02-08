import i18n from "@sitevision/api/common/i18n";
import * as React from "react";
import PropTypes from "prop-types";
import requester from "@sitevision/api/client/requester";
import router from "@sitevision/api/common/router";
const TagSelect = ({ tags, setNews, selectedTags }) => {
  React.useEffect(() => {
    envision.select("#tag-select", {
      maxItems: 10,
      create: false,
      clearButton: true,
      placeholder: i18n.get("selectTags"),
      options: tags,
      items: selectedTags,
      onChange: (value) => {
        requester
          .doGet({
            url: router.getStandaloneUrl("/filterNews"),
            data: {
              query: value,
            },
          })
          .then((response) => {
            setNews(response);
          });
      },
    });
  }, [tags, setNews, selectedTags]);

  return (
    <label>
      <span className="env-assistive-text">{i18n.get("selectTags")}</span>

      <select
        className="env-form-element en-form-input"
        id="tag-select"
        placeholder={i18n.get("selectTags")}
      />
    </label>
  );
};
TagSelect.PropTypes = {
  tags: PropTypes.array,
  setNews: PropTypes.func,
  selectedTags: PropTypes.array,
};

export default TagSelect;
