import React from "react";
import PostPreview from "../PostPreview/PostPreview";
import EmptyPostPreview from "../EmptyPostPreview/EmptyPostPreview";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });
    return postList.sort(
      (a, b) => new Date(a.date).getTime() < new Date(b.date).getTime()
    );
  }
  render() {
    const postList = this.getPostList();
    if (postList.length === 0) {
      return (
        <div className="md-grid md-grid--no-spacing md-cell--middle">
          <div className="md-grid md-cell--8 mobile-fix">
            <EmptyPostPreview />
          </div>
        </div>
      );
    }
    return (
      <div className="md-grid md-grid--no-spacing md-cell--middle">
        <div className="md-grid md-cell--8 mobile-fix">
          {postList.map(post => (
            <PostPreview key={post.title} postInfo={post} />
          ))}
        </div>
      </div>
    );
  }
}

export default PostListing;
