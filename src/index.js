import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
//import App from 'components/App';
//import './index.css';
//import fetchArticlesWithQuery from "./services/api";
import ContentLoader from 'react-content-loader'
import api from "./services/api";

const ArticleList = ({ articles }) => (
  <ul>
    {articles.map(({ objectID, url, title }) => (
      <li key={objectID}>
        <a href={url} target="_blank" rel="noreferrer noopener">
          {title}
        </a>
      </li>
    ))}
  </ul>
);

class App extends Component {
  state = {
    articles: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const articles = await api.fetchArticlesWithQuery("react")
      this.setState({ articles });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }


  render() {
    const { articles, isLoading, error } = this.state;
    return (
      <div>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading ? (
          <ContentLoader viewBox="0 0 380 70">
            {/* Only SVG shapes */}
            <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
            <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
            <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
          </ContentLoader>
        ) : (
          <ArticleList articles={articles} />
        )}
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);