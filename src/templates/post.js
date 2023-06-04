import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost
    const readingTime = readingTimeHelper(post)

    const encodedUrl = encodeURIComponent(post.url.replace('admin', 'blog'))
    const encodedTextForShare = encodeURIComponent(post.custom_excerpt ? post.custom_excerpt : post.title)
    const encodedTags = String((post.tags || []).map((tag) => tag.name).concat(['qbfs', 'phillysports']))

    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        <h1 className="content-title">{post.title}</h1>

                        {post.custom_excerpt ? (
                            <p className="article-excerpt">
                                {post.custom_excerpt}
                            </p>
                        ) : null}

                        {post.feature_image ? (
                            <figure className="post-feature-image">
                                <img
                                    src={post.feature_image}
                                    alt={post.title}
                                />
                            </figure>
                        ) : null}

                        <section className="post-full-content">
                            <div className="post-social-actions">
                                <ul>
                                    <li>
                                        <a
                                            target="_blank"
                                            href={`https://twitter.com/intent/tweet?original_referer=${encodedUrl}&text=${encodedTextForShare}&url=${encodedUrl}&hashtags=${encodedTags}`}
                                            className="btn"
                                            id="b"
                                        >
                                            <i></i>
                                            <span className="label" id="l">
                                                Tweet
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="article-byline">
                                <section className="article-byline-content">
                                    <ul className="author-list">
                                        {post.authors?.map?.((author) => (
                                            <li
                                                className="author-list-item"
                                                key={author.slug}
                                            >
                                                {author.profile_image ? (
                                                    <a
                                                        href={author.url}
                                                        className="author-avatar"
                                                    >
                                                        <img
                                                            className="author-profile-image"
                                                            src={
                                                                author.profile_image
                                                            }
                                                            alt={author.name}
                                                        />
                                                    </a>
                                                ) : (
                                                    <a
                                                        href={author.url}
                                                        className="author-avatar author-profile-image"
                                                    >
                                                        <img
                                                            className="author-profile-image"
                                                            src="/images/icons/avatar.svg"
                                                            height="56"
                                                            width="56"
                                                        />
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="article-byline-meta">
                                        <h4 className="author-name">
                                            {post.authors?.map?.(
                                                (
                                                    { name = "Not Sure" },
                                                    nameIdx
                                                ) =>
                                                    post.authors?.length &&
                                                    nameIdx <
                                                        post.authors.length - 1
                                                        ? `${name}, `
                                                        : name
                                            )}
                                        </h4>
                                        <div className="byline-meta-content">
                                            <time
                                                className="byline-meta-date"
                                                dateTime={post.published_at}
                                            >
                                                {post.published_at_pretty}
                                            </time>
                                            <span className="byline-reading-time">
                                                <span className="bull">
                                                    &bull;
                                                </span>{" "}
                                                {readingTime}
                                            </span>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* The main post content */}
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    );
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
