import React from 'react';

function BlogEngine() {
  return (
    <div className="container">
      <h1>Blog Engine</h1>
      <p>This blog was written in golang and react js the backend is opensource. </p>
      <div>

      </div>
      <div>
        <h2 id="backend-blog">Backend blog</h2>
        <p><a href="https://pkg.go.dev/github.com/PacodiazDG/Backend-blog">
          <img src="https://pkg.go.dev/badge/github.com/PacodiazDG/Backend-blog.svg" alt="Go Reference"/></a>
        <a href="https://deepsource.io/gh/PacodiazDG/Backend-blog/?ref=repository-badge">
          <img src="https://deepsource.io/gh/PacodiazDG/Backend-blog.svg/?label=resolved+issues&amp;show_trend=true&amp;token=4DFcO7X1wodAfZESDT1vlotg" alt="DeepSource"/></a></p>
        <h2 id="requirements">Requirements</h2>
        <ul>
          <li>Go 1.19 or higher.</li>
          <li>MongoDB 6.0 and higher.</li>
          <li>RedisDB 7.0 and higher.</li>
        </ul>
        <h2 id="installation">Installation</h2>
        <pre><code> go install github.com<span className="hljs-regexp">/PacodiazDG/</span>Backend-blog<span className="hljs-meta">@latest</span>
        </code></pre><h2 id="documentation">Documentation</h2>
        <p>Code documentation available at:</p>
        <p><a href="https://pkg.go.dev/github.com/PacodiazDG/Backend-blog">https://pkg.go.dev/github.com/PacodiazDG/Backend-blog</a></p>
        <p>Project documentation can be found at:</p>
        <p><a href="https://github.com/PacodiazDG/Backend-blog/wiki">https://github.com/PacodiazDG/Backend-blog/wiki</a></p>
      </div>

    </div>
  );
}

export default BlogEngine;
