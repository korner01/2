import * as React from "react";
import PropTypes from "prop-types";
import requester from "@sitevision/api/client/requester";
import router from "@sitevision/api/common/router";
import styles from "./Article.scss";
import classNames from "classnames";

const Article = ({
  imageURI,
  URI,
  title,
  description,
  tags,
  userLikes,
  id,
}) => {
  const [like, setLike] = React.useState(userLikes);

  const onLikeClick = () => {
    requester[like ? "doDelete" : "doPost"]({
      url: router.getStandaloneUrl("/like"),
      data: {
        article: id,
      },
    }).then(() => {
      setLike(!like);
    });
  };

  return (
    <article className="env-card env-block env-shadow">
      <header className="env-card__header">
        <img className="env-card__image" src={imageURI} alt="" />
      </header>
      <div className="env-card__body">
        <h2 className="env-card__text--title">
          <a className="env-link-secondary" href={URI}>
            {title}
          </a>
        </h2>
        <p className="env-card__text">{`${description.substring(
          0,
          100
        )}...`}</p>
      </div>
      <footer className="env-card__footer env-d--flex">
        <div className="env-flex__item env-flex__item--grow-9">
          {tags.map(({ value, text }) => {
            return (
              <span key={value} className="env-badge env-m-around-xx-small">
                {text}
              </span>
            );
          })}
        </div>
        <div className="env-flex__item env-flex__item--grow-1">
          <button
            onClick={onLikeClick}
            className="env-button env-button--link env-button--icon"
          >
            <svg
              className={classNames("env-icon", { [styles.likeColor]: like })}
            >
              <use xlinkHref="/sitevision/envision-icons.svg#icon-thumb-up"></use>
            </svg>
          </button>
        </div>
      </footer>
    </article>
  );
};

Article.propTypes = {
  imageURI: PropTypes.string,
  URI: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array,
  userLikes: PropTypes.bool,
  id: PropTypes.string,
};

export default Article;
