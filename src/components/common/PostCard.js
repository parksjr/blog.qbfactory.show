import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)
    const cappedExcerpt = post.excerpt.length > 170
        ? `${post.excerpt.substring(0, 170)}...`
        : post.excerpt

    return (
        <article className="post-card post tag-eagles featured post-card-large">
            <Link className="post-card-image-link" to={url}>
                <img
                    className="post-card-image"
                    src={`${post.feature_image}`}
                    alt={post.title} loading="lazy"
                />
            </Link>

            <div className="post-card-content">

                <Link className="post-card-content-link" to={url}>
                    <header className="post-card-header">
                        {post.tags && (
                            <div className="post-card-tags">
                                {post.featured && (
                                    <span className="post-card-featured"><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.49365 4.58752C3.53115 6.03752 2.74365 7.70002 2.74365 9.25002C2.74365 10.6424 3.29678 11.9778 4.28134 12.9623C5.26591 13.9469 6.60127 14.5 7.99365 14.5C9.38604 14.5 10.7214 13.9469 11.706 12.9623C12.6905 11.9778 13.2437 10.6424 13.2437 9.25002C13.2437 6.00002 10.9937 3.50002 9.16865 1.68127L6.99365 6.25002L4.49365 4.58752Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg> Featured</span>
                                )}
                            </div>
                        )}

                        <h2 className="post-card-title">{post.title}</h2>
                    </header>
                    {post.tags?.map?.((tag, tagIdx) => (
                        <span key={`${post.id}-${tag.slug}-${tagIdx}`}>{tag.name}{tagIdx < post.tags?.length - 1 ? ', ' : ''}</span>
                    ))}
                    <div className="post-card-excerpt">{cappedExcerpt}</div>
                </Link>

                <footer className="post-card-meta">
                    <div className="post-card-footer-right">
                        <div className="post-card-avatar">
                            {post.primary_author.profile_image ? (
                                <img
                                    className="author-profile-image"
                                    src={post.primary_author.profile_image}
                                    alt={post.primary_author.name}
                                />
                            ) : (
                                <img
                                    className="default-avatar"
                                    src="/images/icons/avatar.svg"
                                    alt={post.primary_author.name}
                                />
                            )}
                        </div>
                        <span>{post.primary_author.name}</span>
                        <div>
                            <time className="post-card-meta-date" dateTime={post.published_at}>{post.published_at_pretty}</time>
                            <span className="sep"> — </span>
                            <span className="post-card-meta-length">{readingTime}</span>
                        </div>
                    </div>

                </footer>

            </div>

        </article>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        published_at: PropTypes.string,
        published_at_pretty: PropTypes.string,
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default PostCard
